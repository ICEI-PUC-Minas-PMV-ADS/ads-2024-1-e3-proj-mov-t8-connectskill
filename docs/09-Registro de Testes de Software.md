# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Os testes serão implementados conforme o Plano de Testes em conjunto com o desenvolvimento das funcionalidades. 
Utilizaremos o Jest para realizar os testes das features, seguindo boas práticas de testes de software.

# Testes de funcionalidades iniciais

## Login 

https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/9396532e-df32-4dc1-b06c-57a5b66fb27b

### Avaliação

A tentativa de login com credenciais nao cadastradas é barrada corretamente, um erro de autenticação do Firebase é mostrado na tela, Ao tentar efetuar o login com as credenciais corretas, o login é autenticado e realizado com sucesso de maneira fluida com um modal de confirmação de login.

Nas próximas iterações, a mensagem de erro deverá ser atualizada para uma mensagem mais informativa, como por exemplo "credenciais incorretas".

## Registro de interesses

https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/f292f710-877f-448d-a050-8bf71f73c0f5

### Avaliação

Os interesses sao registrados e persistidos no firestore no contexto do usuário corretamente.

Nas próximas iterações, o registro de interesses deverá ser separado em um contexto próprio, adicionando também a possibilidade de editar seus interesses.

## Exclusão de interesses

https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/611176fe-6b13-475b-bced-cf37b170c748

### Avaliação

Os interesses sao deletados e seu registro é apagado firestore no contexto do usuário corretamente.

Nas próximas iterações, deverá ser adicionado um modal de confirmação ao tentar deletar um interesse.

## Logout

https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/8d189d70-5144-4559-a62f-46de64af3758

### Avaliação

O logout ocorre de forma fluida.

Nas próximas iterações, um modal de confirmação de logout poderá ser adicionado.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)


## Gráficos 

Gráficos e dados sobre o projeto. 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/a187139c-02f9-4cdd-b151-8af31c47dc3a)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/ab823164-7c5c-423e-800d-bcbd1eb70b19)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/84e75877-78a1-48a5-b799-37c1e8b3ba94)



