# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta parte do trabalho você deve detalhar a documentação dos requisitos do sistema proposto de acordo com as seções a seguir. Ressalta-se que aqui é utilizado como exemplo um sistema de gestão de cursos de aperfeiçoamento.

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades administrativas e gerenciais que o setor de academias do Brasil enfrentam e que serão solucionadas pelo programa Fit-Admin

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado Fit-Admin. Ele terá somente um componente (módulo) com os devidos elementos necessários à gestão de academias.

### 3.2.2 Missão do produto
Gerenciar e armazenar informações financeiras como adimplencia e inadimplencia de pagamentos de mensalidades, meios de contatar os alunos e informações como plano escolhido pelo aluno, peso e altura. 

### 3.2.3 Limites do produto
O fit-Admin não armazena dados relacionados a ficha de exercicios dos alunos e nem informações como o horário frequentado pelo aluno ou profissional que acompanha o aluno.

### 3.2.4 Benefícios do produto

| #  | Benefício                                         | Valor para o Cliente |
|----|--------------------------------------------------|----------------------|
| 1  | Facilidade no cadastro de dados                  | Essencial            |
| 2  | Facilidade na recuperação de informações         | Essencial            |
| 3  | Segurança no cadastro de matrículas              | Essencial            |
| 4  | Melhoria na comunicação com os alunos            | Essencial         |
| 5  | Controle centralizado de pagamentos              | Essencial            |
| 6  | Redução de erros no registro de dados financeiros| Essencial            |
| 7  | Histórico completo de pagamentos dos alunos      | Essencial            |
| 8  | Acesso rápido às informações dos alunos          | Essencial            |
| 9  | Organização automática dos dados cadastrais      | Recomendável         |
| 10 | Notificação de pagamentos pendentes              | Recomendável         |
| 11 | Maior agilidade no atendimento na recepção       | Recomendável         |
| 12 | Facilidade para atualizar dados pessoais         | Recomendável         |
| 13 | Relatórios simples sobre pagamentos e matrículas | Recomendável         |
| 14 | Maior confiabilidade no armazenamento de dados   | Essencial            |
| 15 | Redução do uso de papel e registros manuais      | Opcional             |

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF-01 | Cadastro de alunos | O sistema deve permitir o cadastro de novos alunos, incluindo nome, telefone e e-mail. |
| RF-02 | Exclusão de cadastros | O sistema deve permitir a exclusão de cadastros de alunos que não frequentam mais a academia. |
| RF-03 | Edição de informações | O sistema deve permitir a edição de informações dos alunos, como telefone, nome, e-mail. |
| RF-04 | Busca de alunos | O sistema deve permitir a busca de alunos por nome, telefone ou e-mail. |
| RF-05 | Listagem de alunos | O sistema deve exibir uma lista de todos os alunos cadastrados. |
| RF-06 | Filtragem por plano | O sistema deve permitir a filtragem de alunos por plano (mensal, trimestral, anual). |
| RF-07 | Autenticação de usuários | O sistema deve permitir o login de usuários (gestores e recepcionistas) com senha. |
| RF-08 | Alteração de senha | O sistema deve permitir a alteração de senha dos usuários (gestores e recepcionistas). |
| RF-09 | Mensagens de confirmação | O sistema deve exibir uma mensagem de confirmação ao cadastrar, editar ou excluir um aluno. |
| RF-10 | Validação de campos | O sistema deve validar campos obrigatórios durante o cadastro (ex.: nome e telefone). |
| RF-11 | Exportação CSV | O sistema deve permitir a exportação da lista de alunos para um arquivo CSV. |
| RF-12 | Impressão de lista | O sistema deve permitir a impressão da lista de alunos. |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF-01 | O sistema deve ser responsivo, funcionando corretamente em dispositivos móveis e desktops. |
| RNF-02 | O sistema deve ser compatível com os principais navegadores (Chrome, Firefox, Edge e Safari). |
| RNF-03 | O sistema deve ser publicado em um ambiente público, como GitHub Pages ou um servidor web. |
| RNF-04 | O sistema deve ter um bom nível de contraste entre texto e fundo, garantindo acessibilidade. |
| RNF-05 | O sistema deve carregar em menos de 3 segundos, mesmo com até 500 cadastros. |
| RNF-06 | O sistema deve armazenar os dados dos alunos no LocalStorage do navegador. |
| RNF-07 | O sistema deve garantir a persistência dos dados no navegador, mesmo após o fechamento da aba. |
| RNF-08 | O sistema deve exibir mensagens claras de confirmação ou erro após ações do usuário. |
| RNF-09 | Segurança: O sistema deve restringir o acesso por meio de autenticação com senha individual para cada usuário. |
| RNF-10 | Sistema Operacional: O sistema deve funcionar em Windows 10, Windows 11 e macOS Monterey ou superior. |
| RNF-11 | Requisitos de Hardware: O dispositivo deve possuir conexão com a internet para primeira sincronização dos dados. |
| RNF-12 | Disponibilidade: O sistema deve estar disponível 24 horas por dia, 7 dias por semana no ambiente de produção. |
| RNF-13 | Usabilidade: A interface deve ser intuitiva, com navegação clara e terminologia compreensível para usuários sem experiência técnica. |

### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Gestor de Academia | Usuário responsável pela administração e organização do estabelecimento. Possui acesso geral ao sistema para gerenciar cadastros de alunos, consultar informações e visualizar relatórios. |
| Recepcionista | Usuário responsável pelo atendimento e contato direto com os alunos. Pode cadastrar, buscar, editar e consultar informações dos alunos de forma rápida e eficiente. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="286" height="682" alt="Captura de tela 2026-03-23 133758" src="https://github.com/user-attachments/assets/1ba4c6b4-c9ff-464b-bc43-3f76fb81ceea" />


 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

#### Gerenciar cadastro Alunos (CSU01)

Sumário: A Secretária realiza a gestão (inclusão, remoção, alteração e consulta) dos dados pessoais (Número de telefone, Email, Endereço, Foto, Nome, Sexo, Idade, CPF) dos alunos.

Ator Primário: Secretária.

Ator Secundário: Professor.

Pré-condições: A Secretária deve ser validada pelo Sistema.

Fluxo Principal:

1) 	A Secretária requisita ao aluno seus dados pessoais e opção de plano para realizar a matrícula.
2) 	O Sistema apresenta as operações que podem ser realizadas: inclusão de um novo aluno, alteração de um aluno, a exclusão de um aluno e a consulta de dados de um aluno.
3) 	A Secretária seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) 	Se a Secretária desejar continuar com a gestão do cadastro de alunos, o caso de uso retorna ao passo 2; caso contrário o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a)	A Secretária requisita a inclusão de um aluno. <br>
b)	O Sistema apresenta uma janela solicitando os dados (Número de telefone, Email, Endereço, Foto, Nome, Sexo, Idade, CPF) do aluno a ser cadastrado. <br>
c)	A Secretária fornece o dado solicitado. <br>
d)	O Sistema verifica se o aluno já está cadastrado. Se sim, o Sistema reporta o fato e volta ao início; caso contrário, apresenta um formulário em branco para que os detalhes do professor (Número de telefone, Email, Endereço, Foto, Nome, Sexo, Idade, CPF) sejam incluídos. <br>
e)	A Secretária fornece os detalhes do novo aluno. <br>
f)	O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui o novo aluno e o menu listando os alunos cadastrados é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a)	A Secretária seleciona um professor e requisita ao Sistema que o remova. <br>
b)	Se o professor pode ser removido, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a)	A Secretária altera um ou mais dos detalhes do professor e requisita sua atualização. <br>
b)	O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados na lista de professores, caso contrário, o erro é reportado. <br>
 
Fluxo Alternativo (3): Consulta

a)	A Secretária opta por pesquisar pelo nome ou código e solicita a consulta sobre a lista de professores. <br>
b)	O Sistema apresenta uma lista professores. <br>
c)	A Secretária seleciona o professor. <br>
d)	O Sistema apresenta os detalhes do professor no formulário de professores. <br>

Pós-condições: Um professor foi inserido ou removido, seus dados foram alterados ou apresentados na tela.

### Gerenciar Treinos dos Alunos (CSU02)
Sumário: O Professor realiza a gestão (criação, alteração, exclusão e consulta) dos treinos dos alunos matriculados na academia.

Ator Primário: Professor
Ator Secundário: Aluno

Pré-condições:
O Professor deve estar autenticado no sistema.
O aluno deve estar previamente cadastrado.

Fluxo Principal:
O Professor acessa o sistema e seleciona a opção de gerenciamento de treinos.
O Sistema apresenta as operações disponíveis: criação, alteração, exclusão e consulta de treinos.
O Professor seleciona a operação desejada ou opta por encerrar.
O Sistema executa a operação escolhida.
Caso o Professor deseje continuar, o fluxo retorna ao passo 2; caso contrário, o caso de uso é encerrado.
Fluxo Alternativo (3): Criação de Treino

a) O Professor seleciona a opção de criar um treino.

b) O Sistema solicita os dados do treino (exercícios, séries, repetições, carga, observações).
c) O Professor informa os dados.
d) O Sistema valida as informações.
e) Se válidas, o treino é cadastrado para o aluno; caso contrário, o sistema solicita correção.

Fluxo Alternativo (1): Alteração de Treino

a) O Professor seleciona um treino existente.
b) O Sistema apresenta os dados do treino.
c) O Professor altera as informações desejadas.
d) O Sistema valida e salva as alterações.

Fluxo Alternativo (2): Exclusão de Treino

a) O Professor seleciona um treino.
b) O Professor solicita a exclusão.
c) O Sistema verifica se o treino pode ser removido.
d) Se possível, remove o treino; caso contrário, informa erro.

Fluxo Alternativo (3): Consulta de Treino

a) O Professor busca treinos por aluno.
b) O Sistema apresenta a lista de treinos.
c) O Professor seleciona um treino.
d) O Sistema exibe os detalhes.

Pós-condições:
O treino do aluno foi criado, alterado, removido ou consultado com sucesso.

### Gerenciar Pagamentos (CSU03)
Sumário: O setor financeiro realiza o controle de pagamentos dos alunos, incluindo registro, consulta e verificação de inadimplência.

Ator Primário: Funcionário do Financeiro
Ator Secundário: Aluno

Pré-condições:
O funcionário deve estar autenticado no sistema.
O aluno deve estar cadastrado.

Fluxo Principal:
O Funcionário acessa o módulo financeiro.
O Sistema apresenta as opções: registrar pagamento, consultar pagamentos, verificar inadimplência.
O Funcionário seleciona uma opção ou encerra o caso de uso.
O Sistema executa a operação.
O fluxo retorna ao menu inicial ou é encerrado.

Fluxo Alternativo (1): Registrar Pagamento

a) O Funcionário seleciona um aluno.

b) O Sistema apresenta os débitos pendentes.

c) O Funcionário informa o pagamento (valor, data, forma de pagamento).

d) O Sistema valida os dados.

e) Se válidos, registra o pagamento e atualiza o status.

Fluxo Alternativo (2): Consultar Pagamentos

a) O Funcionário busca pagamentos por aluno ou período.

b) O Sistema apresenta a lista de pagamentos.

c) O Funcionário seleciona um registro.

d) O Sistema exibe os detalhes.

Fluxo Alternativo (3): Verificar Inadimplência

a) O Funcionário solicita a lista de alunos inadimplentes.

b) O Sistema gera a lista com base nos pagamentos em atraso.

c) O Funcionário visualiza os alunos com pendências.

Pós-condições:
Os pagamentos foram registrados, consultados ou analisados corretamente.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Aluno |	Cadastro de informações relativas aos alunos. |
| 2	| Curso |	Cadastro geral de cursos de aperfeiçoamento. |
| 3 |	Matrícula |	Cadastro de Matrículas de alunos nos cursos. |
| 4 |	Turma |	Cadastro de turmas.
| 5	|	Professor |	Cadastro geral de professores que ministram as disciplinas. |
| ... |	... |	... |
