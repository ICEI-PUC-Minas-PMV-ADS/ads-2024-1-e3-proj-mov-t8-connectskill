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

# Testes de funcionalidades Etapa 4

## Registro com dados do usuário
https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/850d6d37-1d1b-4b2e-ae1e-2a71ca269368

### Avaliação
O registro de novos usuários com dados adicionais (nome, celular) é realizado com sucesso e os dados são corretamente salvos no Firestore.

## Lista de usuários com filtro de interesses e habilidades
https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/6ed16f99-f963-4630-9df9-ca998b49cee8

### Avaliação
A lista de usuários é exibida corretamente, permitindo a filtragem por interesses e habilidades. A funcionalidade de busca funciona conforme esperado, mostrando apenas os usuários que correspondem aos critérios de busca.

## CRUD de habilidades e interesses
https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/a0951457-9f32-49f1-936d-ff436b22ea74

### Avaliação
As funcionalidades de criar, ler, atualizar e deletar (CRUD) habilidades e interesses funcionam corretamente. Os registros são persistidos no Firestore e as operações de edição e exclusão são refletidas corretamente na interface do usuário.

## Navegação entre abas pela navbar e tooltips das abas
https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/a852e93b-f75c-4026-899a-744f8bce9cfd

### Avaliação
A navegação entre abas pela navbar funciona de forma fluida e intuitiva. Os ícones e labels das abas estão corretos e cada aba leva à sua respectiva tela.
As tooltips em cada aba fornecem informações úteis sobre as funcionalidades disponíveis em cada tela. As tooltips aparecem corretamente ao interagir com os ícones das abas e melhoram a usabilidade do aplicativo.


## Gráficos 

Gráficos e dados sobre o projeto. 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/a187139c-02f9-4cdd-b151-8af31c47dc3a)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/ab823164-7c5c-423e-800d-bcbd1eb70b19)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/84e75877-78a1-48a5-b799-37c1e8b3ba94)



