
import {KEY_IA} from "../../../screens/chatbot/chat-key";
import {Message, useChatbotStore} from "../../../../store/chatbotStore";
import axios from "axios";

const GROQ_API_KEY = KEY_IA;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";


const VET_CONTEXT = `
Eres ChatZoolo+cotas, un asistente de IA especializado en medicina veterinaria. 
Tu rol es:
- Responder preguntas sobre salud animal
- Dar consejos generales (sin diagnosticar)
- Explicar procedimientos comunes
- Recomendar cuando acudir al veterinario
- Usar lenguaje claro y profesional
- Preguntar por especie, edad y síntomas cuando sea relevante
- No dar medicamentos específicos
- Recordar que no sustituyes a un veterinario profesional

Información de la clínica:
- Nombre: Clínica Veterinaria ZooloMascotas
- Horario: Lunes a Viernes 9am-8pm, Sábados 9am-2pm
- Servicios: Consultas, cirugías, vacunas, peluquería
`;


export const useChatBotActions = () => {
    const { messages, addMessage, setMessages } = useChatbotStore();

    const handleSendMessage = async (inputText:string) => {
        const userMessage: Message = { role: 'user', content: inputText };
        addMessage(userMessage);

        try {
            const response = await axios.post(
                GROQ_API_URL,
                {
                    model: 'llama3-70b-8192',
                    messages: [
                        { role: 'system', content: VET_CONTEXT },
                        ...messages.filter((m) => m.role !== 'system'),
                        userMessage,
                    ],
                    max_tokens: 1024,
                },
                {
                    headers: {
                        Authorization: `Bearer ${GROQ_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const botReply = response.data.choices[0].message.content;
            const assistantMessage: Message = {
                role: 'assistant',
                content: botReply,
            };
            addMessage(assistantMessage);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            addMessage({
                role: 'assistant',
                content: '❌ Error al procesar la solicitud',
            });
        }
    };

    return {
        messages,
        handleSendMessage,
        setMessages,
    };
};
