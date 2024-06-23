# Registro de Testes de Software

Testes implementados em uma branch separada, utilizando Jest e fazendo Mock dos campos necessários.

# Registro:

```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockProps = {
  navigation: {
    navigate: mockNavigate,
    goBack: mockGoBack,
    dispatch: jest.fn(),
    reset: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    getId: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
    removeListener: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
  },
};

describe('componente de registro', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o componente de registro', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Register {...mockProps} />
      </NavigationContainer>
    );

    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Celular')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Registrar')).toBeTruthy();
  });

  it('deve mostrar um erro quando o nome é muito longo', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <Register {...mockProps} />
      </NavigationContainer>
    );

    const nameInput = getByPlaceholderText('Nome');
    fireEvent.changeText(nameInput, 'a'.repeat(51));

    const registerButton = getByText('Registrar');
    fireEvent.press(registerButton);

    expect(await findByText('Erro')).toBeTruthy();
    expect(await findByText('O nome deve ter no máximo 50 caracteres.')).toBeTruthy();
  });

  it('deve mostrar um erro quando o email é inválido', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <Register {...mockProps} />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'invalid-email');

    const registerButton = getByText('Registrar');
    fireEvent.press(registerButton);

    expect(await findByText('Erro')).toBeTruthy();
    expect(await findByText('Por favor, insira um email válido.')).toBeTruthy();
  });

  it('deve mostrar um erro quando o velular é inválido', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <Register {...mockProps} />
      </NavigationContainer>
    );

    const celularInput = getByPlaceholderText('Celular');
    fireEvent.changeText(celularInput, '12345');

    const registerButton = getByText('Registrar');
    fireEvent.press(registerButton);

    expect(await findByText('Erro')).toBeTruthy();
    expect(await findByText('Por favor, insira um número de celular válido no formato DDD + Celular, por exemplo 31912344321.')).toBeTruthy();
  });

  it('deve mostrar um erro quando a senha é inválido', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <Register {...mockProps} />
      </NavigationContainer>
    );

    const passwordInput = getByPlaceholderText('Senha');
    fireEvent.changeText(passwordInput, 'pass');

    const registerButton = getByText('Registrar');
    fireEvent.press(registerButton);

    expect(await findByText('Erro')).toBeTruthy();
    expect(await findByText('A senha deve ter no mínimo 6 caracteres, com pelo menos um número e um caractere especial.')).toBeTruthy();
  });

  it('deve chamar a funçao createUserWithEmailAndPassword com os parametros corretos', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '123' },
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Register {...mockProps} />
      </NavigationContainer>
    );

    const nameInput = getByPlaceholderText('Nome');
    const emailInput = getByPlaceholderText('Email');
    const celularInput = getByPlaceholderText('Celular');
    const passwordInput = getByPlaceholderText('Senha');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(celularInput, '31912344321');
    fireEvent.changeText(passwordInput, 'Test@1234');

    const registerButton = getByText('Registrar');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        FIREBASE_AUTH,
        'test@example.com',
        'Test@1234'
      );
    });
  });
});
```



