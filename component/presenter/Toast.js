import Toast, { ErrorToast } from "react-native-toast-message";

export const toastConfig = {
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 18,
            }}
            text2Style={{
                fontSize: 13,
            }}
        />
    ),
};
