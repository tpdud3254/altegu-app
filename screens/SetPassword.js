import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import DefaultLayout from "../component/presenter/layout/DefaultLayout";
import Button from "../component/presenter/button/Button";
import { theme } from "../styles";
import Title from "../component/presenter/title/Title";
import ContentText from "../component/presenter/text/ContentText";

const Container = styled.View`
    flex: 1;
    justify-content: center;
`;

function SetPassword() {
    const [pass, setPass] = useState(false);
    const ClickAuthButton = () => {};

    return (
        <DefaultLayout>
            <Title value="비밀번호 재설정" color="#555555" />
            {pass ? null : (
                <Container>
                    <Button
                        value="본인 인증하기"
                        fn={ClickAuthButton}
                        height="60px"
                        color={theme.btnColor}
                    />
                    <ContentText style={{ fontSize: 19 }}>
                        본인 인증 후 비밀번호 초기화가 가능합니다.
                    </ContentText>
                </Container>
            )}
        </DefaultLayout>
    );
}

SetPassword.propTypes = {};
export default SetPassword;
