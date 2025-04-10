import axios from "axios";
import {KEY_IA} from "../../presentation/screens/chatbot/chat-key";

const GROQ_API_KEY = KEY_IA;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const VET_CONTEXT = `
Eres VetZooloMascotasAssist, un asistente de IA especializado en medicina veterinaria. 
Tu rol es:
- Responder preguntas sobre salud animal
- Dar consejos generales (sin diagnosticar)
- Explicar procedimientos comunes
- Recomendar cuando acudir al veterinario
- Usar lenguaje claro y profesional
- Preguntar por especie, edad y síntomas cuando sea relevante
- NO dar medicamentos específicos
- Recordar que no sustituyes a un veterinario profesional

Información de la clínica:
- Nombre: Clínica Veterinaria ZooloMascotas
- Horario: Lunes a Viernes 9am-8pm, Sábados 9am-2pm
- Servicios: Consultas, cirugías, vacunas, peluquería
`;

export type Message = {
    role: "user" | "assistant" | "system";
    content: string;
};

export const sendMessageToGroq = async (
    input: string,
    previousMessages: Message[]
): Promise<Message> => {
    const messages = [
        { role: "system", content: VET_CONTEXT },
        ...previousMessages.filter(m => m.role !== "system"),
        { role: "user", content: input }
    ];

    const response = await axios.post(
        GROQ_API_URL,
        {
            model: "llama3-70b-8192",
            messages,
            max_tokens: 1024,
        },
        {
            headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );

    const reply = response.data.choices[0].message.content;
    return { role: "assistant", content: reply };
};
