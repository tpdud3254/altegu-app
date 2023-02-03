import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { TextInput } from "../../component/presenter/input/TextInput";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { fonts, theme } from "../../styles";
import Button from "../../component/presenter/button/Button";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import UserContext from "../../Context/UserContext";

const Wrapper = styled.View`
    width: 100%;
`;
const Row = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const Title = styled.Text`
    font-size: 18px;
    width: 24%;
    text-align: center;
    font-family: ${fonts.content};
    margin: -5px 0px -5px 0px;
`;

const Input = styled(TextInput)`
    width: ${(props) => (props.width ? props.width : "75px")};
    margin-right: 5px;
`;

const LargeInput = styled(TextInput)`
    width: 76%;
`;

const TestInput = styled(TextInput)`
    width: 100%;
`;

const Box = styled.TouchableOpacity`
    border: 1px solid ${theme.textBoxColor};
    width: 76%;
    height: 52px;
    justify-content: center;
    padding: 10px;
`;

const BoxText = styled.Text`
    font-size: 20px;
`;

const CheckWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
`;

const CheckText = styled.Text`
    font-size: 20px;
    padding-left: 3px;
`;

const CalendarButton = styled.TouchableOpacity``;

const SelectPicker = styled(Picker)`
    border: 1px solid ${theme.textBoxColor};
    width: 76%;
    height: 52px;
    justify-content: center;
    padding: 10px;
`;

const quantity = ["물량1", "물량2", "물량3"];
const upDown = ["올림", "내림", "양사"];
const floor = [
    "1층",
    "2층",
    "3층",
    "4층",
    "5층",
    "6층",
    "7층",
    "8층",
    "9층",
    "10층",
    "11층",
    "12층 이상",
];

function RegistWork({ route, navigation }) {
    const [initDate, setInitDate] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [time, setTime] = useState({});
    const [checkArr, setCheckArr] = useState([false, false, false]);
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [selectedFloor, setSelectedFloor] = useState();
    const [detailAddress, setDetailAddress] = useState(["", ""]);
    const [cost, setCost] = useState(10000);
    const [commission, setCommission] = useState(10000);
    const [directPayment, setDirectPayment] = useState(false);
    const { info, setInfo } = useContext(UserContext);

    console.log(route);
    useEffect(() => {
        const now = new Date();

        const today = {
            year: now.getFullYear() + "",
            month:
                now.getMonth() < 10
                    ? "0" + (now.getMonth() + 1) + ""
                    : now.getMonth() + 1 + "",
            date:
                now.getDate() < 10
                    ? "0" + now.getDate() + ""
                    : now.getDate() + "",
        };

        const time = {
            hours:
                now.getHours() < 10
                    ? "0" + now.getHours()
                    : now.getHours() + "",
            min:
                now.getMinutes() < 10
                    ? "0" + now.getMinutes()
                    : now.getMinutes() + "",
        };

        setInitDate({ ...today });
        setTime({ ...time });
    }, []);

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const regist = () => {
        Toast.show({
            type: "error",
            text1: "작업이 등록 되었습니다",
        });
    };

    const onChange = (event, selectedDate) => {
        const selected = {
            year: selectedDate.getFullYear() + "",
            month:
                selectedDate.getMonth() < 10
                    ? "0" + (selectedDate.getMonth() + 1) + ""
                    : selectedDate.getMonth() + 1 + "",
            date:
                selectedDate.getDate() < 10
                    ? "0" + selectedDate.getDate() + ""
                    : selectedDate.getDate() + "",
        };

        setSelectedDate({ ...selected });
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange,
            mode: currentMode,
            is24Hour: true,
            display: currentMode === "time" ? "spinner" : "default",
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    const searchAddress = (index) => {
        navigation.navigate("SearchAddress", {
            data: index,
            addressArr: route?.params?.addressArr || ["", ""],
        });
    };

    const onCheck = (index) => {
        const newArr = [];

        checkArr.map((value, i) => {
            if (i === index) {
                newArr.push(true);
            } else {
                newArr.push(false);
            }
        });

        setCheckArr([...newArr]);
    };

    const costWithComma = (cost) => {
        return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <DefaultLayout>
            <ScrollView>
                <Wrapper>
                    <Row>
                        <Title>작업일자</Title>
                        <Input
                            defaultValue={
                                selectedDate.year
                                    ? selectedDate.year
                                    : initDate.year
                            }
                        />
                        <Input
                            defaultValue={
                                selectedDate.month
                                    ? selectedDate.month
                                    : initDate.month
                            }
                        />
                        <Input
                            defaultValue={
                                selectedDate.date
                                    ? selectedDate.date
                                    : initDate.date
                            }
                        />
                        <CalendarButton onPress={showDatepicker}>
                            <Ionicons
                                name={"calendar-outline"}
                                size={35}
                                color={"black"}
                            />
                        </CalendarButton>
                    </Row>
                    <Row>
                        <Title>작업시간</Title>
                        <Input defaultValue={time.hours} />
                        <Input defaultValue={time.min} />
                        <TouchableOpacity onPress={showTimepicker}>
                            <Ionicons
                                name={"time-outline"}
                                size={35}
                                color={"black"}
                            />
                        </TouchableOpacity>
                    </Row>
                    <Row>
                        <Title>작업종류</Title>
                        <LargeInput
                            defaultValue={
                                route?.params.type === "ladder"
                                    ? "사다리"
                                    : "스카이"
                            }
                        />
                    </Row>
                    <Row>
                        <Title>작업높이</Title>
                        <LargeInput
                            defaultValue={
                                route?.params?.range === "high"
                                    ? "고층"
                                    : route?.params?.range === "row"
                                    ? "저층"
                                    : "중층"
                            }
                        />
                    </Row>
                    <Row>
                        <Title>휴대전화</Title>
                        <Input defaultValue={info.phone.substring(0, 3)} />
                        <Input defaultValue={info.phone.substring(3, 7)} />
                        <Input
                            defaultValue={info.phone.substring(
                                7,
                                info.phone.length
                            )}
                        />
                    </Row>
                    <Row>
                        <Title>작업물량</Title>
                        <Picker //TODO: Picker style
                            ref={pickerRef}
                            selectedValue={selectedQuantity}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedQuantity(itemValue)
                            }
                            style={{ width: "74%" }}
                        >
                            {quantity.map((value, index) => (
                                <Picker.Item
                                    key={index}
                                    label={value}
                                    value={value}
                                    style={{ fontSize: 20 }}
                                />
                            ))}
                        </Picker>
                    </Row>
                    <Row>
                        <Title>작업주소</Title>
                        <Box onPress={() => searchAddress(0)}>
                            <BoxText>
                                {route?.params?.addressArr
                                    ? route?.params?.addressArr[0]
                                    : ""}
                            </BoxText>
                        </Box>
                    </Row>
                    <Row>
                        <Title></Title>
                        <LargeInput placeholder="상세주소 입력" />
                    </Row>
                    <Row>
                        <Title>올림/내림</Title>
                        {upDown.map((value, index) => (
                            <CheckWrapper key={index}>
                                <Checkbox
                                    style={{ width: 30, height: 30 }}
                                    value={checkArr[index]}
                                    onValueChange={() => onCheck(index)}
                                    color={
                                        checkArr[index]
                                            ? theme.btnPointColor
                                            : null
                                    }
                                />
                                <CheckText>{value}</CheckText>
                            </CheckWrapper>
                        ))}
                    </Row>
                    {checkArr[2] ? (
                        <>
                            <Row>
                                <Title>작업주소</Title>
                                <Box onPress={() => searchAddress(1)}>
                                    <BoxText>
                                        {route?.params?.addressArr
                                            ? route?.params?.addressArr[1]
                                            : ""}
                                    </BoxText>
                                </Box>
                            </Row>
                            <Row>
                                <Title></Title>
                                <LargeInput placeholder="상세주소 입력" />
                            </Row>
                        </>
                    ) : null}
                    <Row>
                        <Title>작업 층</Title>
                        <Picker //TODO: Picker style
                            ref={pickerRef}
                            selectedValue={selectedFloor}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedFloor(itemValue)
                            }
                            style={{ width: "74%" }}
                        >
                            {floor.map((value, index) => (
                                <Picker.Item
                                    key={index}
                                    label={value}
                                    value={value}
                                    style={{ fontSize: 20 }}
                                />
                            ))}
                        </Picker>
                    </Row>
                    <Row>
                        <Title>오더비용</Title>
                        <Input
                            defaultValue={costWithComma(cost) + "원"}
                            width="150px"
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setCost(cost + 1000);
                            }}
                        >
                            <Ionicons
                                name={"add-circle-outline"}
                                size={35}
                                color={"black"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCost(cost - 1000);
                            }}
                        >
                            <Ionicons
                                name={"remove-circle-outline"}
                                size={35}
                                color={"black"}
                            />
                        </TouchableOpacity>
                    </Row>
                    <Row>
                        <Title>수수료</Title>
                        <Input
                            defaultValue={costWithComma(commission) + " P"}
                            width="150px"
                        />
                    </Row>
                    <Row>
                        <Title>현장결제</Title>
                        <Checkbox
                            style={{ width: 30, height: 30 }}
                            value={directPayment}
                            onValueChange={() =>
                                setDirectPayment(!directPayment)
                            }
                            color={directPayment ? theme.btnPointColor : null}
                        />
                    </Row>
                    <Row>
                        <Title>특이사항</Title>
                    </Row>

                    <Row>
                        <TestInput />
                    </Row>
                </Wrapper>
                <Button value="작업등록" fn={regist} />
            </ScrollView>
        </DefaultLayout>
    );
}

RegistWork.propTypes = {};
export default RegistWork;
