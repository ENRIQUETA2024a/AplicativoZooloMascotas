import { useState } from "react";
import {Message, sendMessageToGroq} from "../../../../actions/chatbot/chatbotActions";


export const useChatBotActions = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const newUserMessage: Message = { role: "user", content: inputText };
        setMessages((prev) => [...prev, newUserMessage]);
        setInputText("");
        setIsLoading(true);

        try {
            const newBotMessage = await sendMessageToGroq(inputText, messages);
            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            console.error("Error al llamar a Groq:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "❌ Error al procesar la solicitud" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        inputText,
        setInputText,
        isLoading,
        handleSendMessage,
    };
};
