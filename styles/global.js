import { StyleSheet } from "react-native";
import { COLORS} from "../constants/colors";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 48,
    },
    text: {
        fontSize: 24,
        color: '#333',
    },
    smallText: {
        fontSize: 16,
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
    },
    inputField: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    coloredContainer: {
        flex: 1,
        padding: 48,
        backgroundColor: COLORS.green,
    },
    whiteItem: {
        flexDirection: 'row',
        padding: 16,
        marginTop: 16,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 15,
        backgroundColor: "white"
    }

})