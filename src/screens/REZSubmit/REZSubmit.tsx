import React, {useEffect, useState, useContext, useMemo} from 'react';
import {Alert, Image, View} from 'react-native';
import styled from 'styled-components/native';
import {
  SelectSymptomContext,
  SelectImageContext,
} from '~/src/ReservationContext';
import checkIcon from '@assets/images/complete_icon.png';
import {REZSubmitNavigationProps} from '~/src/types/type';
import {SelectContext} from '~/src/ReservationContext';
import {DocInfoContext} from '~/src/ReservationContext';
import {getToken} from '~/src/AuthContext';
import {config} from '~/src/config';

function REZSubmit({navigation}: REZSubmitNavigationProps) {
  const {symptomText, setSymptomText} = useContext(SelectSymptomContext);
  const {selectImage, setSelectImage} = useContext(SelectImageContext);

  const {selectDate} = useContext(SelectContext);
  const {docInfo} = useContext(DocInfoContext);

  const getTime: Date = useMemo(
    () =>
      new Date(
        selectDate.year,
        selectDate.month,
        selectDate.date,
        Number(selectDate.time.split(':')[0]),
        Number(selectDate.time.split(':')[1]),
      ),
    [],
  );

  const userSelectedDate = `${String(selectDate.year).padStart(
    2,
    '0',
  )}-${String(selectDate.month).padStart(2, '0')}-${String(
    selectDate.date,
  ).padStart(2, '0')}(${selectDate.day})`;

  const currentDate = useMemo(() => {
    const today = new Date();
    const weekArray = ['일', '월', '화', '수', '목', '금', '토'];
    const stringDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0') +
      `(${weekArray[today.getDay()]})` +
      today.toLocaleTimeString([], {timeStyle: 'short'});

    return stringDate;
  }, []);

  const postReservationData = async () => {
    const formData = new FormData();
    selectImage.map(picture => {
      const photo = {
        uri: picture.uri,
        type: 'multipart/form-data',
        name: `${picture.fileName}.jpg`,
      };
      formData.append('img', photo);
    });
    formData.append('doctor_id', docInfo.id);
    formData.append('symptom', symptomText);
    formData.append('year', `${selectDate.year}`);
    formData.append('month', `${selectDate.month}`);
    formData.append('date', `${selectDate.date}`);
    formData.append('time', `${selectDate.time}`);

    const response = await fetch(`${config.detail}`, {
      method: 'POST',
      headers: {
        Authorization: await getToken(),
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    //TODO : 비동기 로직 테스트 중 try,catch
    // const data = await response.json();
    // console.log(response);
    // console.log(data);
    // try {
    //   if (response.status === 201) {
    //     Alert.alert('예약이 완료됐습니다.');
    //     navigation.navigate('Mains');
    //     setSymptomText('');
    //     setSelectImage([]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    if (response.status === 201) {
      Alert.alert('예약이 완료됐습니다.');
      navigation.navigate('Mains');
      setSymptomText('');
      setSelectImage([]);
    } else {
      Alert.alert('예약에 실패했습니다. 잠시후 다시 시도해주세요.');
    }
  };

  const goBackScreen = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header>
        <Image source={checkIcon} />
        <HeaderText>진료 예약을 확정하시겠습니까?</HeaderText>
      </Header>

      <Body>
        <InfoContainer>
          <InfoTitle>담당의사</InfoTitle>
          {docInfo && (
            <REZInfo>
              {docInfo.name} ({docInfo.hospital} / &nbsp;
              {docInfo.subject})
            </REZInfo>
          )}
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>신청일시</InfoTitle>
          <REZInfo>{currentDate}</REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>예약일시</InfoTitle>
          <REZInfo>
            {userSelectedDate +
              getTime.toLocaleTimeString([], {timeStyle: 'short'})}
          </REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>예약내용</InfoTitle>
          <REZInfo>
            {symptomText.length < 18
              ? symptomText
              : symptomText.slice(0, 17) + '...'}
          </REZInfo>
        </InfoContainer>
      </Body>
      <CautionInfoContainer>
        <CautionInfo>
          승인 완료 후 신청한 예약시간에 진료가 진행됩니다.{'\n'} 진료 1시간
          전의 예약은 취소가 불가합니다.
        </CautionInfo>
      </CautionInfoContainer>
      <Footer>
        <ConfirmBtn onPress={postReservationData}>
          <View>
            <BtnText>예약 확정</BtnText>
          </View>
        </ConfirmBtn>
        <ModifyBtn onPress={goBackScreen}>
          <BtnText>예약 수정</BtnText>
        </ModifyBtn>
      </Footer>
    </Container>
  );
}

export default REZSubmit;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

const Header = styled.View`
  flex: 2;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.REZSubmitBorder};
`;

const HeaderText = styled.Text`
  margin: 20px;
  color: ${({theme}) => theme.REZSubmitTitle};
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
`;

const Body = styled.View`
  flex: 3;
  align-items: flex-start;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const InfoTitle = styled.Text`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({theme}) => theme.REZSubmitTitle};
  margin-right: 12px;
`;

const REZInfo = styled.Text`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({theme}) => theme.REZSubmitFont}; ;
`;

const CautionInfoContainer = styled.View`
  flex: 2;
  justify-content: flex-end;
`;

const CautionInfo = styled.Text`
  color: ${({theme}) => theme.REZSubmitFooter};
`;

const Footer = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 5%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-size: ${({theme}) => theme.fontMedium};
`;

const ConfirmBtn = styled.TouchableOpacity`
  width: 60%;
  height: 70%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.primary};
`;

const ModifyBtn = styled.TouchableOpacity`
  width: 37%;
  height: 70%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.REZSubmitFont};
`;
