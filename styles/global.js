import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 48,
    },
    text: {
        fontSize: 24,
        color: '#333',
    },
    paragraph: {
        fontSize: 16,
        marginVertical: 8,
        lineHeight: 20
    },
    item: {
        flexDirection: 'row',
        padding: 16,
        marginTop: 16,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 15
    }
})