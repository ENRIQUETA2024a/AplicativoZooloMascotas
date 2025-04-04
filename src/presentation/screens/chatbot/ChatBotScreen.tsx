// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import axios from 'axios';
//
// interface Message {
//     id: string;
//     text: string;
//     isUser: boolean;
//     timestamp: Date;
// }
//
// export const ChatbotScreen = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [inputText, setInputText] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const flatListRef = useRef<FlatList>(null);
//
//     const handleSendMessage = async () => {
//         if (inputText.trim() === '') return;
//
//         // Agregar mensaje del usuario
//         const userMessage: Message = {
//             id: Date.now().toString(),
//             text: inputText,
//             isUser: true,
//             timestamp: new Date(),
//         };
//
//         setMessages(prev => [...prev, userMessage]);
//         setInputText('');
//         setIsLoading(true);
//
//         try {
//             // Llamar a la API de DeepSeek
//             const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
//                 model: "deepseek-chat",
//                 messages: [
//                     {
//                         role: "user",
//                         content: inputText
//                     }
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 1000
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer YOUR_DEEPSEEK_API_KEY`
//                 }
//             });
//
//             // Agregar respuesta del chatbot
//             const botMessage: Message = {
//                 id: Date.now().toString(),
//                 text: response.data.choices[0].message.content,
//                 isUser: false,
//                 timestamp: new Date(),
//             };
//
//             setMessages(prev => [...prev, botMessage]);
//         } catch (error) {
//             console.error('Error calling DeepSeek API:', error);
//             const errorMessage: Message = {
//                 id: Date.now().toString(),
//                 text: 'Lo siento, ocurrió un error al procesar tu solicitud.',
//                 isUser: false,
//                 timestamp: new Date(),
//             };
//             setMessages(prev => [...prev, errorMessage]);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         // Mensaje de bienvenida inicial
//         const welcomeMessage: Message = {
//             id: '0',
//             text: '¡Hola! Soy tu asistente de DeepSeek. ¿En qué puedo ayudarte hoy?',
//             isUser: false,
//             timestamp: new Date(),
//         };
//         setMessages([welcomeMessage]);
//     }, []);
//
//     const renderMessage = ({ item }: { item: Message }) => (
//         <View style={[
//             styles.messageContainer,
//             item.isUser ? styles.userMessage : styles.botMessage
//         ]}>
//             <LinearGradient
//                 colors={item.isUser ? ['#6e48aa', '#9d50bb'] : ['#5f2c82', '#49a09d']}
//                 style={styles.gradient}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//             >
//                 <Text style={styles.messageText}>{item.text}</Text>
//                 <Text style={styles.timestamp}>
//                     {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </Text>
//             </LinearGradient>
//         </View>
//     );
//
//     return (
//         <LinearGradient
//             colors={['#0f0c29', '#302b63', '#24243e']}
//             style={styles.container}
//         >
//             <FlatList
//                 ref={flatListRef}
//                 data={messages}
//                 renderItem={renderMessage}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.messagesContainer}
//                 onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//             />
//
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={styles.inputContainer}
//             >
//                 <TextInput
//                     style={styles.input}
//                     value={inputText}
//                     onChangeText={setInputText}
//                     placeholder="Escribe tu mensaje..."
//                     placeholderTextColor="#999"
//                     multiline
//                 />
//                 <TouchableOpacity
//                     style={styles.sendButton}
//                     onPress={handleSendMessage}
//                     disabled={isLoading}
//                 >
//                     <Text style={styles.sendButtonText}>
//                         {isLoading ? '...' : 'Enviar'}
//                     </Text>
//                 </TouchableOpacity>
//             </KeyboardAvoidingView>
//         </LinearGradient>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//     },
//     messagesContainer: {
//         padding: 16,
//     },
//     messageContainer: {
//         maxWidth: '80%',
//         marginBottom: 12,
//         borderRadius: 12,
//         overflow: 'hidden',
//     },
//     userMessage: {
//         alignSelf: 'flex-end',
//     },
//     botMessage: {
//         alignSelf: 'flex-start',
//     },
//     gradient: {
//         padding: 12,
//         borderRadius: 12,
//     },
//     messageText: {
//         color: 'white',
//         fontSize: 16,
//     },
//     timestamp: {
//         color: 'rgba(255, 255, 255, 0.7)',
//         fontSize: 10,
//         marginTop: 4,
//         alignSelf: 'flex-end',
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         padding: 16,
//         paddingBottom: 24,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     input: {
//         flex: 1,
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         color: 'white',
//         borderRadius: 20,
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         marginRight: 8,
//         maxHeight: 100,
//     },
//     sendButton: {
//         backgroundColor: '#6e48aa',
//         borderRadius: 20,
//         padding: 12,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 80,
//     },
//     sendButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

import {Text} from "@ui-kitten/components";

export const ChatbotScreen = () => {
    return (
        <Text>
            Hola
        </Text>
    )
}