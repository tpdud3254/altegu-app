import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import InputItem from "../../component/presenter/item/InputItem";
import { TextInput } from "../../component/presenter/input/TextInput";
import InputBtnItem from "../../component/presenter/item/InputBtnItem";
import { Input } from "../../component/presenter/input/Input";

function OrdinarySignUp() {
    return (
        <View>
            <InputItem title="이름">
                <TextInput
                    placeholder="이름 (2자리 이상)"
                    returnKeyType="next"
                    onSubmitEditing={() => onNext(passwordRef)}
                    onChangeText={(text) => setValue("name", text)}
                />
            </InputItem>
            <InputBtnItem title="비밀번호 등록" btnTitle="보기" fn={onClick}>
                <Input
                    ref={passwordRef}
                    placeholder="비밀번호 (8자리 이상)"
                    secureTextEntry={textSecure}
                    returnKeyType="done"
                    onChangeText={(text) => setValue("password", text)}
                />
            </InputBtnItem>
        </View>
    );
}

OrdinarySignUp.propTypes = {};
export default OrdinarySignUp;
