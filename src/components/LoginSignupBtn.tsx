import React, {ReactNode} from 'react';
import styled from 'styled-components/native';

interface Props {
  userInfo: object;
  navigation: object;
  id: string;
  children: ReactNode;
  postData: () => void;
}

function LoginSignupBtn({postData, children}: Props) {
  return (
    <BtnContainer>
      <LoginBtn onPress={postData}>
        <LoginText>{children}</LoginText>
      </LoginBtn>
    </BtnContainer>
  );
}

export default LoginSignupBtn;

const BtnContainer = styled.View`
  flex: 1;
  top: 10px;
`;

const LoginBtn = styled.Pressable`
  width: 300px;
  height: 52px;
  border-radius: 8px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
`;

const LoginText = styled.Text`
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
  color: white;
`;
