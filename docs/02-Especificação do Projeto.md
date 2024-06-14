# Especificações do Projeto

O aplicativo de troca de habilidades é uma plataforma digital desenvolvida para promover uma cultura de aprendizado contínuo e colaboração em um mundo cada vez mais conectado digitalmente. Com a rápida evolução tecnológica e as constantes mudanças nos mercados de trabalho, é essencial que as pessoas estejam sempre buscando adquirir novas habilidades e conhecimentos para se adaptarem e se desenvolverem pessoalmente. 

Este projeto visa eliminar barreiras geográficas, financeiras ou de outra natureza ao acesso a oportunidades de aprendizado, proporcionando um espaço virtual onde os indivíduos podem compartilhar suas habilidades e aprender uns com os outros, independentemente de sua localização ou recursos financeiros.

## Personas

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/125780065/4a644269-8de2-4189-8cc2-1e064626e3d8)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/125780065/b5079314-3c80-4c52-9c3a-ec79f8205fbe)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/125780065/e6181c82-bef7-48da-83ae-0044bee0ac29)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/125780065/5a459eb6-5ad8-4b2e-9bac-0cd6770edbda)



## Histórias de Usuários


<table>
  <tr>
    <th>Persona</th>
    <th>Quero/Preciso</th>
    <th>Motivo</th>
  </tr>
  <tr>
    <td>Leandro</td>
    <td>Aprofundar seus conhecimentos em temas além do curriculo escolas.</td>
    <td>Cursar uma boa faculdade, expandir o seu dominio.</td>
  </tr>
  <tr>
    <td>Isa</td>
    <td>Aprender a tocar violão.</td>
    <td>Aprender um novo instrumento é um hobby.</td>
  </tr>
  <tr>
    <td>Pedro</td>
    <td>Aprender a empreender.</td>
    <td>Desejo de abrir o próprio negócio.</td>
  </tr>
  <tr>
    <td>Malu</td>
    <td>Aprender novos idiomas.</td>
    <td>Preencher o tempo livre.</td>
  </tr>
</table>




## Requisitos

### Requisitos Funcionais
Os Requisitos Funcionais definem o comportamento do sistema. Descrevem o que o sistema deve fazer com detalhes sobre as operações que serão realizadas.

<table>
  <tr>
    <th>Requisito Funcional</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>RF01 - Gerenciamento de Habilidades</td>
    <td>Permite que os usuários informem e atualizem os grupos de habilidades que possuem. Isso possibilita uma melhor organização e categorização das habilidades dos usuários dentro do sistema, facilitando a busca por perfis específicos e a formação de equipes com base nas competências necessárias para determinadas tarefas ou projetos.</td>
  </tr>
  <tr>
    <td>RF02 - Busca por grupos/interesses</td>
    <td>Os usuários têm a capacidade de realizar buscas e aplicar filtros para encontrar outros usuários com base em suas habilidades, interesses e disponibilidade. Isso permite que os usuários encontrem perfis específicos que atendam às suas necessidades ou interesses.</td>
  </tr>
  <tr>
    <td>RF03 - Agendamento Flexível</td>
    <td>Permite aos usuários agendar sessões de aprendizado de acordo com sua disponibilidade pessoal. Ao acessar a plataforma, os usuários têm a opção de escolher o horário que melhor se adequa à sua agenda e preferências. O sistema também fornece um campo para que os usuários possam indicar sua disponibilidade, facilitando a organização e coordenação de horários entre os participantes.</td>
  </tr>
  <tr>
    <td>RF04 - Integração com ferramentas de comunicação</td>
    <td>Permite aos usuários se comunicarem por meio de mensagens e chamadas de vídeo integradas à plataforma. Os usuários podem utilizar ferramentas de comunicação, como o WhatsApp, Telegram, Google Meet, para interagir diretamente com outros usuários dentro da plataforma, facilitando a troca de informações, o esclarecimento de dúvidas e a colaboração em projetos e atividades de aprendizado.</td>
  </tr>
  <tr>
    <td>RF05 - Sistema de Avaliação e Feedback</td>
    <td>Usuários podem avaliar e fornecer feedback sobre suas experiências após as sessões de aprendizado.</td>
  </tr>
  <tr>
    <td>RF06 - Suporte a Diversas Áreas de Conhecimento</td>
    <td>Os usuários têm acesso a uma ampla variedade de campos de especialização, incluindo tecnologia, culinária, design, artes, corte e costura, idiomas, entre outros. Isso permite que os usuários explorem e compartilhem conhecimentos em áreas específicas de interesse, expandindo suas habilidades e oportunidades de aprendizado.</td>
  </tr>
</table>


### Requisitos não Funcionais

Os Requisitos Não Funcionais especificam critérios que podem ser usados para julgar a operação de um sistema. Eles não descrevem o que o sistema faz, mas como o sistema faz.

<table>
  <tr>
    <th>Requisito Não Funcional</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>RNF 01 - Usabilidade</td>
    <td>A interface do usuário será projetada visando proporcionar uma experiência intuitiva e acessível para pessoas de todas as idades. Será desenvolvida de forma a garantir que os usuários possam navegar e utilizar suas funcionalidades sem a necessidade de treinamento. O objetivo é promover uma experiência de uso fluida e eficiente, maximizando a satisfação do usuário e otimizando a produtividade.</td>
  </tr>
  <tr>
    <td>RNF 02 - Desempenho</td>
    <td>As respostas do sistema devem ser rápidas, com tempos de carregamento de páginas inferiores a 2 segundos.</td>
  </tr>
  <tr>
    <td>RNF 03 - Segurança</td>
    <td>Serão implementadas medidas robustas para proteger os dados dos usuários. A aplicação deve usar protocolo HTTPS, garantindo que os dados transmitidos estejam criptografados e protegidos contra interceptação por terceiros. O padrão de senha deve seguir o mínimo de 8 caracteres incluindo letras, números e caracteres especiais.</td>
  </tr>
  <tr>
    <td>RNF 04 - Escalabilidade</td>
    <td>A plataforma deve ser capaz de suportar um aumento significativo no número de usuários sem degradação do desempenho.</td>
  </tr>
  <tr>
    <td>RNF 05 - Confiabilidade</td>
    <td>O sistema será projetado visando uma disponibilidade de serviço de 99.9%. Isso significa que a plataforma estará operacional e acessível aos usuários durante a maior parte do tempo, com interrupções mínimas.</td>
  </tr>
  <tr>
    <td>RNF 06 - Acessibilidade</td>
    <td>A plataforma deve ser acessível para usuários com diferentes tipos de deficiências, seguindo as diretrizes de acessibilidade da web.</td>
  </tr>
  <tr>
    <td>RNF 07 - Interoperabilidade</td>
    <td>O aplicativo deve ser capaz de integrar-se com outras plataformas e serviços para enriquecer a experiência do usuário.</td>
  </tr>
  <tr>
    <td>RNF 08 - Manutenção</td>
    <td>Para garantir a manutenção do sistema, é crucial que o código seja bem documentado e estruturado de forma clara e coesa. Isso facilitará não apenas as atualizações futuras, mas também a própria manutenção do código ao longo do tempo.</td>
  </tr>
</table> 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                                 |
|--|-----------------------------------------------------------|
|01| O projeto deverá ser entregue até final de junho de 2024. |
|02| Não pode ser desenvolvido um módulo de backend            |

## Diagrama de Casos de Uso

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/47a4ac4a-8d02-4517-87cd-9749642f4e55)


# Matriz de Rastreabilidade

<table>
  <tr>
    <th>Matriz de Rastreabilidade</th>
    <th>Perfil de Usuário</th>
    <th>Busca e Filtro</th>
    <th>Agendamento Flexível</th>
    <th>Integração com Whatsapp</th>
    <th>Avaliação e Feedback</th>
    <th>Suporte a Áreas de Conhecimento</th>
  </tr>
  <tr>
    <td>Perfil de Usuário</td>
    <td>X</td>
    <td>X</td>
    <td></td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Busca e Filtro</td>
    <td></td>
    <td>X</td>
    <td></td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Agendamento Flexível</td>
    <td>X</td>
    <td></td>
    <td>X</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Integração com Whatsapp</td>
    <td></td>
    <td></td>
    <td></td>
    <td>X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Avaliação e Feedback</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Suporte a Áreas de Conhecimento</td>
    <td>X</td>
    <td>X</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

## Descrição do Processo BPMN futuro

### 1. Página de Login
- **Start Event:** O processo começa na página de login onde o usuário tem a opção de logar ou registrar-se na plataforma.
- **Gateway: Logar ou Registrar?** 
  - **Logar:** Se o usuário já possui uma conta, ele pode escolher logar.
  - **Registrar:** Se o usuário não possui uma conta, ele pode escolher registrar-se.

### 2. Página Inicial
- Após o login ou registro, o usuário é direcionado para a página inicial.
- **Intermediate Event: Página Inicial**

### 3. Funcionalidades Disponíveis na Página Inicial
- **Task: Registrar Interesse**
  - O usuário pode registrar seus interesses na plataforma.
- **Task: Visualizar Perfil**
  - O usuário pode visualizar seu perfil e verificar suas informações.
- **Task: Deletar Interesse**
  - O usuário pode deletar seus interesses previamente registrados.
- **Task: Deslogar**
  - O usuário pode deslogar da plataforma.

### 4. Fim da Sessão
- **End Event: Fim da Sessão**
  - O processo termina quando o usuário escolhe deslogar da plataforma.

### Diagrama BPMN

Segue a representação visual do processo em BPMN:



## Descrição do Processo BPMN para o Projeto ConnectSkill

### 1. Página de Login
- **Start Event:** O processo começa na página de login onde o usuário tem a opção de registrar ou logar na plataforma.
- **Gateway: Informações Corretas?**
  - **Registrar ou Logar:** O usuário pode escolher registrar ou logar.
  - **Mensagem de Erro:** Se as informações fornecidas estiverem incorretas, uma mensagem de erro é exibida.
  - **Recuperar Senha:** Se necessário, o usuário pode optar por recuperar a senha.

### 2. Página Inicial
- Após o login bem-sucedido, o usuário é direcionado para a página inicial.
- **Intermediate Event: Página Inicial**

### 3. Funcionalidades Disponíveis na Página Inicial
- **Task: Registrar Interesse**
  - O usuário pode registrar seus interesses na plataforma.
- **Task: Visualizar Perfil**
  - O usuário pode visualizar seu perfil e verificar suas informações.
- **Task: Editar Perfil**
  - O usuário pode editar as informações do seu perfil.
- **Task: Pesquisar Interesses**
  - O usuário pode pesquisar interesses de outras pessoas.
- **Task: Editar Interesse**
  - O usuário pode editar os interesses previamente registrados.
- **Task: Deletar Interesse**
  - O usuário pode deletar seus interesses previamente registrados.

### 4. Conexões com Outros Usuários
- **Task: Visualizar Pessoa com Interesse em Comum**
  - O usuário pode visualizar pessoas com interesses em comum.
- **Task: Solicitar Conexão com a Pessoa**
  - O usuário pode solicitar conexão com a pessoa.
- **Gateway: Resposta?**
  - **Compartilhar Dados de Contato:** Se a resposta for positiva, o usuário pode compartilhar dados de contato.
  - **Cancelar Conexão:** Se a resposta for negativa, a conexão é cancelada.

### 5. Fim da Sessão
- **Task: Deslogar**
  - O usuário pode deslogar da plataforma.
- **End Event: Fim da Sessão**
  - O processo termina quando o usuário escolhe deslogar da plataforma.

### Diagrama BPMN

Segue a representação visual do processo em BPMN:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/94996003/ab41e73b-fb14-4a13-83db-f9601e9dbe61)


# Gerenciamento de Projeto

O projeto será desenvolvido em etapas, onde a cada entrega haverá uma prioridade em foco. Ele será administrado por meio da designação de tarefas pela plataforma Trello, e qualquer necessidade de criar prototipagem ou wireframes será atendida utilizando o Figma.

(https://trello.com/invite/b/wl1WNmiq/ATTI901c0ae89ee9162bf10fc3e337799066011507C9/etapa-2))

## Gerenciamento de Tempo

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/cc649bcd-3184-4f3b-af54-8589e5d45ddd)


## Gerenciamento de Equipe

O time será gerenciado por meio da ferramenta de atribuição, Jira. 
https://connectskill.atlassian.net/jira/servicedesk/projects/SUP/boards/1


## Gestão de Orçamento

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-2024-1-e3-proj-mov-t8-connectskill/assets/127440373/708f39c0-a521-45f5-a77d-0a26cac0404d)
