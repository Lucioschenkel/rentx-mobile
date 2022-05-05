import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';

import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
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
        <Title>{title}</Title>
      )}
    </Container>
  );
}
