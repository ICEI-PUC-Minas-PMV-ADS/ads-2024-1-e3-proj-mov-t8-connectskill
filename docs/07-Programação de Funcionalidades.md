# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="4-Metodologia.md"> Metodologia</a>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="5-Arquitetura da Solução.md"> Arquitetura da Solução</a>

# ConnectSkill

O Projeto está em estágio final e possui as seguintes funcionalidades implementadas:

- Tela de Login e Cadastro funcionais.
- Validação dos campos por regex.
- Autenticação de usuário pelo firebase.
- Aba Interesses onde o usuário pode adicionar, editar e deletar seus interesses.
- Aba Habilidades onde o usuário pode adicionar, editar e deletar suas habilidades. 
- Aba perfil, com informações sobre o usuário, interesses, habilidades e conexoes.
- Aba Connect, onde o usuário pode ver uma lista com informações sobre os outros usuários e efetuar uma conexão.
- Barra de navegaçao inferior, onde o usuário pode navegar entre as abas do aplicativo.
- Filtro de usuários por interesse e habilidade.
- Tooltips para cada aba.

Tecnologias utilizadas:
- TypeScript
- React Native
- Expo
- Firebase (Firestore e Authetication)

Observação: As telas ainda não foram estilizadas.

## Funcionalidades implementadas:

# Tela de Login e cadastro:

- Tela funcional, conta com autenticação de login e cadastro com a API de autenticação do Firebase****
![9858f6f7-bd35-488b-9dac-3f114f30a14e](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/d00a7901-83c3-41e6-a279-f590d496933c)

- Configurações da autenticação do console do projeto no firebase:
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/4c2645d0-b13b-44e2-bcaa-652c16af43e1)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/5206fde8-7ffe-4f02-b01a-23df526c8402)

- Vídeo mostrando o processo de login com credenciais incorretas e depois com as credenciais corretas
  
https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/187f46d7-3926-4dc4-9fa3-a9f8c23e7f3b

- Vídeo mostrando a tentativa do processo de login sem um cadastro realizado com as credenciais, logo após, realizando cadastro e logando com as credenciais

https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/1ca4bb90-89fe-431c-9383-90dcc3770b45

- Credenciais salvas no Firebase:
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/71f0c4f3-0817-45e9-9855-d7d108fd6914)

# Tela de registro de interesses:

- Tela onde o usuário pode cadastrar e deletar os interesses da sua conta, os interesses são persistidos em uma collection no firestore que guarda os interesses por usuário:

- Vídeo demonstrando o processo de registro dos interesses por usuário, também a página de perfil e o processo de logout

https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/41825524-1f33-49a7-9904-d8cc23d772aa

# Estrutura dos dados no Firestore:

- A Collection de usuário guarda cada usuário com um identificador único:
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/6ba2d690-878b-466d-8859-9c0507300875)

- Cada usuário possui seus interesses, também guardados com um identificador único:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/61bc8d53-2cd0-4113-90d8-0c5ddcbec2b9)
(Interesse teste criado no vídeo demonstrativo)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/b05ca6a3-cf16-419d-af9c-aa25dd23041c)
(Interesse tulio criado no vídeo demonstrativo)

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Node.js
- Expo CLI

## Como executar o projeto

1. Clone o repositório: `git clone https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill.git`
2. Acesse a pasta do projeto: `cd src/ConnectSkillFireBase`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `expo start`
5. Caso utilize o android studio, rode o comando `npx react-native run-android`
5. Caso utilize o app Expo go no seu dispositivo móvel, escaneie o QR code exibido no terminal

## Links úteis

- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Documentação do Expo](https://docs.expo.io/)
- [Documentação do Tamagui](https://tamagui.org/)

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)
