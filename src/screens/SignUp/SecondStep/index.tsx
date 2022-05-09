import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { RootStackParamList } from '../../../routes/types';

import {
  Container,
  Header,
  Steps,
  SubTitle,
  Title,
  Form,
  FormTitle,
} from './styles';
import { PasswordInput } from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

interface Params {
  user: {
    email: string;
    name: string;
    driversLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { user } = route.params as Params;

  const theme = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      return Alert.alert('Atenção', 'Informe e confirme a senha');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Atenção', 'As senhas não são iguais');
    }

    // Enviar para API e cadastrar
    api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driversLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          id: 'Confirmation',
          nextScreenRoute: 'SignIn',
          title: 'Conta criada!',
          message: `Agora é só fazer login\ne aproveitar.`,
        });
      })
      .catch((err) => {
        Alert.alert('Erro', 'Não foi possível concluir o cadastro');
      });
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'} conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
            />
            <PasswordInput
              iconName="lock"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repetir senha"
            />
          </Form>

          <Button
            title="Próximo"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
