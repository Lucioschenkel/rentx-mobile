import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  InputText,
  IconContainer,
  ChangePasswordVisibilityButton,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleInputFocused = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);

    setIsFilled(!!value);
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        {/* @ts-ignore */}
        <Feather
          name={iconName}
          size={24}
          isFocused={isFocused}
          color={
            isFilled || isFocused ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        value={value}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        secureTextEntry={!isPasswordVisible}
      />

      <ChangePasswordVisibilityButton
        onPress={handlePasswordVisibilityChange}
        isFocused={isFocused}
      >
        {/* @ts-ignore */}
        <Feather
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
