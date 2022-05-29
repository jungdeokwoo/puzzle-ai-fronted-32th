import React, {ReactNode} from 'react';
import styled from 'styled-components/native';

interface Props {
  id: string;
  children: ReactNode;
  postData: () => void;
  navigate: (id: string) => void;
}

function LoginSignupBtn({navigate, postData, id, children}: Props) {
  return (
    <LoginBtn onPress={postData}>
      <LoginText>{children}</LoginText>
    </LoginBtn>
  );
}

export default LoginSignupBtn;

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
