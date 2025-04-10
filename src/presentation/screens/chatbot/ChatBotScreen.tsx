import React from "react";
import {
    Layout,
    Text,
    Input,
    Button,
    List,
    Spinner,
    useTheme,
} from "@ui-kitten/components";
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import {useChatBotActions} from "../../components/hooks/chatbot/useChatBotActions";
import {Message} from "../../../actions/chatbot/chatbotActions";


export const ChatBotScreen = () => {
    const {
        messages,
        inputText,
        setInputText,
        isLoading,
        handleSendMessage,
    } = useChatBotActions();

    const theme = useTheme();

    const renderMessage = ({ item }: { item: Message }) => (
        <Layout
            style={[
                styles.messageContainer,
                item.role === "user"
                    ? {
                        backgroundColor: theme["color-primary-500"],
                        alignSelf: "flex-end",
                    }
                    : {
                        backgroundColor: theme["color-basic-100"],
                        alignSelf: "flex-start",
                    },
            ]}
        >
            <Text
                style={[
                    styles.messageText,
                    item.role === "user" && { color: theme["color-basic-100"] },
                ]}
            >
                {item.content}
            </Text>
        </Layout>
    );

    const renderFooter = () =>
        isLoading ? (
            <Layout style={styles.loaderContainer}>
                <Spinner size="small" />
            </Layout>
        ) : null;

    return (
        <Layout style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
            >
                <List
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.messageList}
                    ListFooterComponent={renderFooter}
                    showsVerticalScrollIndicator={false}
                />
                <Layout style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Escribe tu mensaje..."
                        multiline
                        maxLength={500}
                        textStyle={{ minHeight: 40, paddingTop: 10 }}
                        disabled={isLoading}
                    />
                    <Button
                        style={styles.sendButton}
                        onPress={handleSendMessage}
                        disabled={isLoading || !inputText.trim()}
                        size="medium"
                    >
                        Enviar
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginBottom: 20,
    },
    messageList: {
        padding: 16,
        paddingBottom: 20,
    },
    messageContainer: {
        marginVertical: 6,
        padding: 12,
        borderRadius: 12,
        maxWidth: "80%",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "color-basic-100",
        borderTopWidth: 1,
        borderColor: "color-basic-300",
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: "color-basic-200",
    },
    sendButton: {
        borderRadius: 20,
    },
    loaderContainer: {
        alignItems: "center",
        paddingVertical: 10,
    },
    welcomeText: {
        textAlign: "center",
    },
});
