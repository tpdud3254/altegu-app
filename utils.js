export const checkPassword = (password) => {
    const regExp = /^[A-Za-z0-9]{8,}$/;

    if (!password.match(regExp)) {
        return false;
    } else {
        return true;
    }
};
