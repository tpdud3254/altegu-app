import Toast, { ErrorToast } from "react-native-toast-message";

export const toastConfig = {
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 20,
            }}
            text2Style={{
                fontSize: 15,
            }}
        />
    ),
};
