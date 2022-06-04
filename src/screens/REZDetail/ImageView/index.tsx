import styled from 'styled-components/native';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {SelectImageContext} from '~/src/ReservationContext';
import {Asset} from 'react-native-image-picker';
import cameraImg from 'assets/images/reservation-photo-icon.png';

const ImageView = () => {
  const {selectImage} = useContext(SelectImageContext);

  return (
    <Image>
      <ViewTitle>환부 사진 업로드(선택)</ViewTitle>
      <ImageContainer>
        {selectImage.map((item: Asset) => (
          <SelectImgWrapper key={item.fileName}>
            <ImageWrapper>
              <SpreadImg source={item} />
            </ImageWrapper>
          </SelectImgWrapper>
        ))}
        {selectImage.length < 3 && (
          <ImageWrapper>
            <CameraLogo source={cameraImg} />
          </ImageWrapper>
        )}
      </ImageContainer>
    </Image>
  );
};

export default ImageView;

const Image = styled.View`
  flex: 1;
`;

const ViewTitle = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
`;

const ImageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 4% 2%;
  align-items: center;
  height: 100%;
  width: 33%;
`;

const ImageWrapper = styled.Pressable`
  height: 100%;
  width: 100%;
  margin: 0 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.MakeREZInputBack};
`;

const SelectImgWrapper = styled.View`
  height: 100%;
  width: 100%;
  margin: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({theme}) => theme.MakeREZInputBack};
`;

const SpreadImg = styled.Image`
  height: 100%;
  width: 100%;
`;

const CameraLogo = styled.Image`
  height: 24%;
  width: 27%;
`;
