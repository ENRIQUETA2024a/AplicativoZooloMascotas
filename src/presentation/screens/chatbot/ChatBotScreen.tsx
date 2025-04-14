import React, {useState} from "react";
import {
    Layout,
    Text,
    Input,
    Button,
    List,
    useTheme
} from "@ui-kitten/components";
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView, Modal, View
} from "react-native";
import {useChatBotActions} from "../../components/hooks/chatbot/useChatBotActions";
import {Message, useChatbotStore} from "../../../store/chatbotStore";

export const ChatBotScreen = () => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // ✅ Nuevo estado para el modal
    const {messages, handleSendMessage} = useChatBotActions();
    const {clearMessages} = useChatbotStore();
    const theme = useTheme();

    const handleSend = async () => {
        if (!inputText.trim()) return;

        setIsLoading(true);
        await handleSendMessage(inputText);
        setInputText('');
        setIsLoading(false);
    };

    const renderMessage = ({item}: { item: Message }) => (
        <Layout
            style={[
                styles.messageContainer,
                item.role === 'user'
                    ? {backgroundColor: theme['color-primary-500'], alignSelf: 'flex-end'}
                    : {backgroundColor: theme['color-basic-100'], alignSelf: 'flex-start'},
            ]}
        >
            <Text style={item.role === 'user' ? {color: '#fff'} : {}}>{item.content}</Text>
        </Layout>
    );

    return (
        <Layout style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
            >
                <List
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(_, i) => i.toString()}
                    contentContainerStyle={styles.messageList}
                />

                <Layout style={styles.inputContainer}>
                    <Input
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Escribe tu mensaje..."
                        multiline
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <Button onPress={handleSend} disabled={!inputText.trim() || isLoading}>
                        Enviar
                    </Button>
                </Layout>

                <Button
                    status="danger"
                    appearance="outline"
                    onPress={() => setShowModal(true)} // ✅ Mostramos el modal
                >
                    Borrar Historial
                </Button>

                {/* ✅ Modal de Confirmación */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)} // Android back button
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{marginBottom: 16}}>
                                ¿Estás seguro de que deseas borrar el historial del chatbot?
                            </Text>
                            <View style={styles.modalActions}>
                                <Button size="small" status="basic" onPress={() => setShowModal(false)}>
                                    Cancelar
                                </Button>
                                <Button
                                    size="small"
                                    status="danger"
                                    onPress={() => {
                                        clearMessages();
                                        setShowModal(false);
                                    }}
                                >
                                    Borrar
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    safeContainer: {flex: 1},
    container: {flex: 1, marginBottom: 20},
    messageList: {padding: 16, paddingBottom: 20},
    messageContainer: {
        marginVertical: 6,
        padding: 12,
        borderRadius: 12,
        maxWidth: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: '80%',
    },
});