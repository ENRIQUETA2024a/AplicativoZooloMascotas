import {create} from 'zustand'
import {persist, PersistStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Message = {
    role: 'user' | 'assistant' | 'system',
    content: string;
}

type ChatbotState = {
    messages: Message[];
    addMessage: (message: Message) => void;
    setMessages: (messages: Message[]) => void;
    clearMessages: () => void;
}

// Adaptador de almacenamiento compatible con Zustand
const zustandStorage: PersistStorage<ChatbotState> = {
    getItem: async (name) => {
        const item = await AsyncStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    },
    setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: async (name) => {
        await AsyncStorage.removeItem(name);
    },
};

export const useChatbotStore = create<ChatbotState>()(
    persist(
        (set) => ({
            messages: [],
            addMessage: (message) =>
                set((state) => ({ messages: [...state.messages, message] })),
            setMessages: (messages) => set({ messages }),
            clearMessages: () => set({ messages: [] }),
        }),
        {
            name: 'chatbot-storage',
            storage: zustandStorage,
        }
    )
);