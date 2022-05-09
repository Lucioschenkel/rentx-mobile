import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';

import { Container, Title } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color ?? theme.colors.main}
      onPress={onPress}
      enabled={enabled}
      style={{
        opacity: !enabled || loading ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} size="large" />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
