import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import Button from "../../component/presenter/button/Button";
import { theme } from "../../styles";
import { ORDINARY, SPECIAL } from "../../constant";

const Container = styled.View`
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    flex: 1;
    margin-top: 100px;
`;

const BtnProps = {
    width: "48%",
    height: "150px",
    textSize: 30,
    color: theme.main,
};

function SignUp() {
    const navigation = useNavigation();

    const onPress = (data) => {
        navigation.navigate("SignUpStep1", {
            memberType: data,
        });
    };
    return (
        <DefaultLayout>
            <Container>
                <Button
                    value="일반회원 가입"
                    fn={() => {
                        onPress(ORDINARY);
                    }}
                    {...BtnProps}
                />
                <Button
                    value="기사회원 가입"
                    fn={() => {
                        onPress(SPECIAL);
                    }}
                    {...BtnProps}
                />
            </Container>
        </DefaultLayout>
    );
}

SignUp.propTypes = {};
export default SignUp;
