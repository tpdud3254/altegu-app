import React, { useContext } from "react";
import SignUpContext from "../../Context/SIgnUpContext";
import { ORDINARY } from "../../constant";
import OrdinarySignUp from "./OrdinarySignUp";
import SpecialSignUp from "./SpecialSignUp";

function SignUpStep1() {
    const { info } = useContext(SignUpContext);

    return info.userType === ORDINARY ? <OrdinarySignUp /> : <SpecialSignUp />;
}

export default SignUpStep1;
