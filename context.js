import { createContext, useState } from "react";

export const IsLoggedInContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

const IsLoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = { isLoggedIn, setIsLoggedIn };

    return (
        <IsLoggedInContext.Provider value={value}>
            {children}
        </IsLoggedInContext.Provider>
    );
};

const IsLoggedInConsumer = IsLoggedInContext.Consumer;

export { IsLoggedInProvider, IsLoggedInConsumer };
export default IsLoggedInContext;
