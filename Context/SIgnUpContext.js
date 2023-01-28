import { createContext, useState } from "react";

export const SignUpContext = createContext({
    info: {},
    setInfo: () => {},
});

const SignUpProvider = ({ children }) => {
    const [info, setInfo] = useState({});

    const value = { info, setInfo };

    return (
        <SignUpContext.Provider value={value}>
            {children}
        </SignUpContext.Provider>
    );
};

const SignUpConsumer = SignUpContext.Consumer;

export { SignUpProvider, SignUpConsumer };
export default SignUpContext;
