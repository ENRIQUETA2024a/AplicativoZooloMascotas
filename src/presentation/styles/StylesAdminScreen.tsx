import {StyleSheet} from "react-native";

export const StylesAdminScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    headerTitle: {
        color: "#1A2138",
        fontWeight: "bold",
    },
    addButton: {
        borderRadius: 10,
    },
    listContent: {
        padding: 15,
        flexGrow: 1,
    },
    inlineError: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFECEC',
        marginHorizontal: 15,
        borderRadius: 8,
        marginTop: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        width: 60,
        height: 60,
        marginBottom: 15,
        opacity: 0.5,
    },
    emptyText: {
        textAlign: "center",
        color: "#8F9BB3",
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        borderRadius: 10,
    },
    searchButton: {
        borderRadius: 10,
        paddingHorizontal: 15,
    },

    errorText: {
        flex: 1,
        marginRight: 10,
    },

    // Estilo para el indicador de búsqueda
    searchIndicator: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    // Fondo semi-transparente
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semi-transparente
        justifyContent: "center", // Centrado verticalmente
        alignItems: "center", // Centrado horizontalmente
    },
    // Contenedor del modal
    modalContainer: {
        width: "90%", // Ancho del modal
        maxWidth: 500, // Máximo ancho para pantallas grandes
        borderRadius: 20, // Bordes redondeados más pronunciados
        overflow: "hidden", // Evita que el contenido se desborde
        elevation: 10, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    // Estilo del Card
    modalCard: {
        width: "100%",
        maxHeight: "90%", // Limita el alto al 80% de la pantalla
        borderRadius: 16,
        padding: 0, // Padding manejado por los hijos
        backgroundColor: "#FFF",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    // Título del modal
    modalTitle: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 20, // Tamaño de fuente más grande
        color: "#1A2138", // Color de texto oscuro
    },

    // Teclado
    keyboardAvoidingContainer: {
        flex: 1,
    },
});