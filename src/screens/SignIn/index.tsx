import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as yup from 'yup';
import { useTheme } from 'styled-components/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, SubTitle, Title, Footer, Form } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
      password: yup.string().required('Senha é obrigatória'),
    });

    try {
      await schema.validate({ email, password });

      // TODO fazer login
      signIn({ email, password });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Atenção', error.message);
      }

      return Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      );
    }
  };

  const handleCreateNewAccount = () => {
    navigation.navigate('SignUpFirstStep', { id: 'SignUpFirstStep' });
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />
            <Title>Estamos {'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar {'\n'} uma experiência incrível
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={!!email && !!password}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleCreateNewAccount}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
