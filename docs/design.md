# 4. PROJETO DO DESIGN DE INTERAÇÃO

O presente documento descreve o projeto de design de interação da aplicação **Fit-Admin**, sistema voltado à gestão administrativa de academias. O objetivo do design é propor uma interface simples, objetiva, responsiva e acessível, capaz de apoiar usuários como gestores, recepcionistas, funcionários financeiros e professores/instrutores nas principais atividades operacionais da academia.

A proposta de interface considera os requisitos definidos na especificação do sistema, especialmente as funcionalidades de cadastro de alunos, edição de informações, busca, listagem, filtragem por plano, autenticação, alteração de senha, exportação CSV, impressão de listas, controle de pagamentos e, caso mantido no escopo final, gerenciamento de treinos dos alunos.

## 4.1 Personas

As personas abaixo representam perfis de usuários que podem interagir com o Fit-Admin no contexto de uma academia de pequeno ou médio porte.

---

### Persona 1 — Carlos Henrique, Gestor de Academia

**Idade:** 42 anos  
**Profissão:** Proprietário e gestor de academia  
**Escolaridade:** Ensino superior completo  
**Familiaridade com tecnologia:** Intermediária  
**Dispositivos utilizados:** Notebook e smartphone

**Descrição:**  
Carlos é responsável pela administração geral da academia, acompanhando matrículas, pagamentos, inadimplência, planos contratados e informações dos alunos. Ele precisa de uma ferramenta que permita visualizar rapidamente a situação da academia, consultar dados cadastrais e acompanhar informações financeiras sem depender de planilhas manuais.

**Objetivos:**

- Ter uma visão geral dos alunos cadastrados.
- Consultar rapidamente alunos ativos e inativos.
- Acompanhar pagamentos e inadimplência.
- Reduzir erros em registros administrativos.
- Exportar ou imprimir listas quando necessário.

**Dores e dificuldades:**

- Dificuldade em manter planilhas atualizadas.
- Perda de tempo procurando dados de alunos.
- Falta de centralização das informações.
- Risco de erro em controles financeiros manuais.

**Necessidades no sistema:**

- Dashboard com indicadores principais.
- Lista de alunos com busca e filtros.
- Relatórios simples de alunos, planos e pagamentos.
- Interface clara e objetiva.

---

### Persona 2 — Mariana Souza, Recepcionista

**Idade:** 28 anos  
**Profissão:** Recepcionista de academia  
**Escolaridade:** Ensino médio completo  
**Familiaridade com tecnologia:** Básica a intermediária  
**Dispositivos utilizados:** Computador da recepção

**Descrição:**  
Mariana atua no atendimento direto aos alunos. Ela realiza cadastros, atualiza telefones, consulta e-mails, verifica planos contratados e precisa localizar rapidamente as informações dos alunos durante o atendimento.

**Objetivos:**

- Cadastrar novos alunos com rapidez.
- Buscar alunos por nome, telefone ou e-mail.
- Atualizar dados cadastrais.
- Consultar o plano contratado pelo aluno.
- Confirmar se uma operação foi realizada com sucesso.

**Dores e dificuldades:**

- Atendimento prejudicado quando as informações estão espalhadas.
- Risco de preencher dados incorretos.
- Dificuldade em localizar alunos rapidamente.
- Necessidade de uma interface simples, sem termos técnicos.

**Necessidades no sistema:**

- Formulário de cadastro simples.
- Campos obrigatórios destacados.
- Validação de dados.
- Mensagens claras de erro e sucesso.
- Busca rápida e visível.

---

### Persona 3 — Renato Lima, Professor/Instrutor

**Idade:** 35 anos  
**Profissão:** Professor de musculação  
**Escolaridade:** Ensino superior em Educação Física  
**Familiaridade com tecnologia:** Intermediária  
**Dispositivos utilizados:** Smartphone e tablet

**Descrição:**  
Renato acompanha alunos durante os treinos e precisa consultar informações básicas dos alunos. Caso o módulo de treinos permaneça no escopo, ele também poderá registrar, consultar e alterar planos de treinamento.

**Objetivos:**

- Consultar rapidamente informações do aluno.
- Verificar dados cadastrais básicos.
- Registrar ou consultar treinos, caso essa funcionalidade seja mantida.
- Acessar o sistema em dispositivos móveis.

**Dores e dificuldades:**

- Dificuldade em acessar informações durante o atendimento.
- Uso de registros manuais ou anotações separadas.
- Necessidade de navegação simples em telas menores.

**Necessidades no sistema:**

- Interface responsiva.
- Busca rápida por aluno.
- Tela de detalhes do aluno.
- Módulo de treino separado, se validado pelo escopo final.

**Observação de escopo:**  
A funcionalidade de treino deve ser validada pelo grupo, pois a especificação apresenta uma divergência entre os limites do produto e os casos de uso descritos.

---

### Persona 4 — Beatriz Alves, Funcionária do Financeiro

**Idade:** 31 anos  
**Profissão:** Auxiliar administrativo-financeira  
**Escolaridade:** Ensino técnico ou superior em andamento  
**Familiaridade com tecnologia:** Intermediária  
**Dispositivos utilizados:** Computador administrativo

**Descrição:**  
Beatriz é responsável por registrar pagamentos, consultar pendências e identificar alunos inadimplentes. Ela precisa de uma interface que facilite a conferência dos débitos e reduza erros no registro financeiro.

**Objetivos:**

- Registrar pagamentos de mensalidades.
- Consultar histórico de pagamentos.
- Identificar alunos inadimplentes.
- Filtrar informações por período, aluno ou plano.
- Exportar dados financeiros quando necessário.

**Dores e dificuldades:**

- Controle manual de pagamentos.
- Risco de registrar valores incorretos.
- Dificuldade em identificar inadimplentes rapidamente.
- Falta de histórico centralizado.

**Necessidades no sistema:**

- Tela de pagamentos clara.
- Status visual de adimplência e inadimplência.
- Histórico de pagamentos por aluno.
- Mensagens de confirmação após registros financeiros.

---

## 4.2 Mapa de Empatia

### Mapa de Empatia — Gestor de Academia

| Dimensão             | Descrição                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| O que pensa e sente? | Preocupa-se com a organização da academia, inadimplência, satisfação dos alunos e confiabilidade das informações. |
| O que vê?            | Planilhas, anotações manuais, informações dispersas e dificuldade de acompanhamento administrativo.               |
| O que fala e faz?    | Busca formas de melhorar a gestão, cobra informações da equipe e precisa tomar decisões rápidas.                  |
| O que escuta?        | Reclamações sobre demora no atendimento, erros de cadastro e dúvidas sobre pagamentos.                            |
| Dores                | Falta de centralização, erros manuais, retrabalho e dificuldade em acompanhar indicadores.                        |
| Ganhos esperados     | Controle centralizado, relatórios simples, agilidade na consulta e maior confiabilidade dos dados.                |

---

### Mapa de Empatia — Recepcionista

| Dimensão             | Descrição                                                                              |
| -------------------- | -------------------------------------------------------------------------------------- |
| O que pensa e sente? | Precisa atender rapidamente e evitar erros no cadastro dos alunos.                     |
| O que vê?            | Alunos aguardando atendimento, fichas incompletas e dados desatualizados.              |
| O que fala e faz?    | Solicita dados pessoais, atualiza cadastros, busca alunos e confirma informações.      |
| O que escuta?        | Alunos perguntando sobre planos, pagamentos e dados cadastrais.                        |
| Dores                | Interface confusa, campos sem validação, dificuldade de encontrar alunos e retrabalho. |
| Ganhos esperados     | Cadastro simples, busca rápida, mensagens claras e menos erros operacionais.           |

---

### Mapa de Empatia — Professor/Instrutor

| Dimensão             | Descrição                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------- |
| O que pensa e sente? | Quer acessar rapidamente as informações necessárias para orientar os alunos.                  |
| O que vê?            | Alunos em atendimento, necessidade de consulta rápida e uso frequente de dispositivos móveis. |
| O que fala e faz?    | Consulta informações dos alunos e, se aplicável, acompanha treinos.                           |
| O que escuta?        | Alunos perguntando sobre evolução, plano e orientações de treino.                             |
| Dores                | Falta de acesso móvel, informações incompletas e registros manuais.                           |
| Ganhos esperados     | Consulta rápida, interface responsiva e acesso objetivo aos dados do aluno.                   |

---

### Mapa de Empatia — Funcionária do Financeiro

| Dimensão             | Descrição                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------- |
| O que pensa e sente? | Preocupa-se com a precisão dos registros financeiros e com o controle de inadimplência.     |
| O que vê?            | Pagamentos pendentes, registros manuais e necessidade de conferência recorrente.            |
| O que fala e faz?    | Registra pagamentos, consulta pendências e organiza informações financeiras.                |
| O que escuta?        | Dúvidas de alunos sobre mensalidades, vencimentos e formas de pagamento.                    |
| Dores                | Controle financeiro descentralizado, risco de erro e demora para identificar inadimplentes. |
| Ganhos esperados     | Registro seguro, histórico de pagamentos, filtros e exportação de dados.                    |

---

## 4.3 Protótipos das Interfaces

Os protótipos de interface do Fit-Admin devem priorizar simplicidade, clareza visual, responsividade e facilidade de navegação. A aplicação deverá funcionar adequadamente em desktop e dispositivos móveis, conforme os requisitos não funcionais definidos.

### 4.3.1 Diretrizes visuais

A interface seguirá uma identidade visual adequada ao contexto de academias, com aparência moderna, limpa e funcional.

**Cores sugeridas:**

- Verde ou azul como cor principal, remetendo a saúde, confiança e organização.
- Branco ou cinza claro como fundo principal.
- Vermelho para alertas de inadimplência ou erros.
- Verde para confirmações e status regular.
- Amarelo ou laranja para avisos e pendências.

**Tipografia sugerida:**

- Fonte sem serifa, como Arial, Roboto ou Inter.
- Títulos em destaque.
- Textos de apoio com boa legibilidade.
- Botões com rótulos claros e objetivos.

**Princípios aplicados:**

- Contraste adequado entre texto e fundo.
- Agrupamento visual de informações relacionadas.
- Hierarquia clara entre títulos, botões e conteúdos.
- Feedback visual após ações do usuário.
- Navegação simples e consistente.

---

### 4.3.2 Tela de Login

**Objetivo:**  
Permitir que usuários autorizados acessem o sistema mediante e-mail ou usuário e senha.

**Elementos da tela:**

- Logotipo ou nome Fit-Admin.
- Campo de usuário ou e-mail.
- Campo de senha.
- Botão “Entrar”.
- Link ou opção para alteração de senha, se aplicável.
- Mensagem de erro em caso de credenciais inválidas.

**Requisitos relacionados:**

- RF-07 — Autenticação de usuários.
- RF-08 — Alteração de senha.
- RNF-09 — Restrição de acesso por senha individual.

**Comportamento esperado:**

- Ao informar credenciais válidas, o usuário é direcionado ao painel inicial.
- Ao informar dados inválidos, o sistema apresenta mensagem clara de erro.
- Campos obrigatórios devem ser destacados quando não preenchidos.

---

### 4.3.3 Tela Inicial / Dashboard

**Objetivo:**  
Apresentar uma visão geral da academia para facilitar o acompanhamento administrativo.

**Elementos da tela:**

- Total de alunos cadastrados.
- Quantidade de alunos por plano.
- Indicador de pagamentos em dia.
- Indicador de alunos inadimplentes.
- Atalhos para cadastro de aluno, lista de alunos e pagamentos.
- Menu lateral ou superior com navegação principal.

**Usuários principais:**

- Gestor de Academia.
- Funcionária do Financeiro.
- Recepcionista.

**Comportamento esperado:**

- O usuário visualiza os principais indicadores após o login.
- Os atalhos permitem acesso rápido às funções mais usadas.
- Em dispositivos móveis, os cards devem se reorganizar verticalmente.

---

### 4.3.4 Tela de Cadastro de Alunos

**Objetivo:**  
Permitir o cadastro de novos alunos da academia.

**Elementos da tela:**

- Nome completo.
- Telefone.
- E-mail.
- Plano contratado: mensal, trimestral ou anual.
- Peso.
- Altura.
- Status do aluno.
- Botão “Salvar”.
- Botão “Cancelar”.
- Mensagem de confirmação após cadastro.

**Requisitos relacionados:**

- RF-01 — Cadastro de alunos.
- RF-09 — Mensagens de confirmação.
- RF-10 — Validação de campos.

**Comportamento esperado:**

- Campos obrigatórios devem ser validados antes do salvamento.
- O sistema deve impedir cadastro incompleto quando campos essenciais estiverem vazios.
- Após salvar, deve ser exibida mensagem de sucesso.
- Em caso de erro, a mensagem deve indicar o campo que precisa ser corrigido.

---

### 4.3.5 Tela de Listagem e Busca de Alunos

**Objetivo:**  
Permitir a visualização, busca e filtragem de alunos cadastrados.

**Elementos da tela:**

- Campo de busca por nome, telefone ou e-mail.
- Filtro por plano.
- Tabela ou lista de alunos.
- Botões de visualizar, editar e excluir.
- Botão de exportação CSV.
- Botão de impressão.
- Indicação visual de status do aluno.

**Requisitos relacionados:**

- RF-04 — Busca de alunos.
- RF-05 — Listagem de alunos.
- RF-06 — Filtragem por plano.
- RF-11 — Exportação CSV.
- RF-12 — Impressão de lista.

**Comportamento esperado:**

- A busca deve atualizar os resultados de forma rápida.
- O filtro por plano deve permitir selecionar mensal, trimestral ou anual.
- A listagem deve ser organizada e legível.
- A exportação deve gerar um arquivo CSV com os dados exibidos.
- A impressão deve gerar uma versão limpa da lista.

---

### 4.3.6 Tela de Edição de Aluno

**Objetivo:**  
Permitir a atualização das informações cadastrais de um aluno.

**Elementos da tela:**

- Formulário preenchido com os dados atuais do aluno.
- Campos editáveis.
- Botão “Salvar alterações”.
- Botão “Cancelar”.
- Mensagem de confirmação.

**Requisitos relacionados:**

- RF-03 — Edição de informações.
- RF-09 — Mensagens de confirmação.
- RF-10 — Validação de campos.

**Comportamento esperado:**

- O sistema deve carregar os dados atuais do aluno.
- Após a edição, o sistema deve validar os campos obrigatórios.
- As alterações devem ser persistidas no LocalStorage.
- O usuário deve receber confirmação de sucesso.

---

### 4.3.7 Confirmação de Exclusão de Cadastro

**Objetivo:**  
Evitar exclusões acidentais de alunos.

**Elementos da tela/modal:**

- Nome do aluno selecionado.
- Mensagem de confirmação.
- Botão “Confirmar exclusão”.
- Botão “Cancelar”.

**Requisitos relacionados:**

- RF-02 — Exclusão de cadastros.
- RF-09 — Mensagens de confirmação.

**Comportamento esperado:**

- O sistema deve solicitar confirmação antes de excluir.
- Após confirmação, o aluno deve ser removido da listagem.
- O sistema deve exibir mensagem de sucesso.

---

### 4.3.8 Tela de Pagamentos

**Objetivo:**  
Permitir o controle de pagamentos dos alunos, incluindo registro, consulta e identificação de inadimplência.

**Elementos da tela:**

- Busca de aluno.
- Lista de pagamentos.
- Status: pago, pendente ou vencido.
- Valor da mensalidade.
- Data de vencimento.
- Data de pagamento.
- Forma de pagamento.
- Botão “Registrar pagamento”.
- Filtro por período.
- Filtro por status.

**Requisitos relacionados:**

- Controle centralizado de pagamentos.
- Histórico completo de pagamentos dos alunos.
- Redução de erros no registro financeiro.
- Relatórios simples sobre pagamentos e matrículas.

**Comportamento esperado:**

- O usuário financeiro pode consultar pagamentos por aluno.
- O sistema apresenta débitos pendentes.
- Após registrar pagamento, o status do aluno é atualizado.
- Alunos inadimplentes devem ser destacados visualmente.

---

### 4.3.9 Tela de Alteração de Senha

**Objetivo:**  
Permitir que usuários autorizados alterem sua senha de acesso.

**Elementos da tela:**

- Campo de senha atual.
- Campo de nova senha.
- Campo de confirmação da nova senha.
- Botão “Alterar senha”.
- Mensagem de sucesso ou erro.

**Requisitos relacionados:**

- RF-08 — Alteração de senha.
- RNF-09 — Segurança por senha individual.

**Comportamento esperado:**

- O sistema deve validar se a nova senha e a confirmação são iguais.
- O sistema deve apresentar mensagem clara em caso de erro.
- Após alteração bem-sucedida, deve ser exibida confirmação.

---

### 4.3.10 Tela de Treinos dos Alunos — Funcionalidade a Validar

**Objetivo:**  
Permitir que professores/instrutores consultem ou gerenciem treinos dos alunos, caso o grupo confirme que essa funcionalidade pertence ao escopo final do sistema.

**Elementos da tela:**

- Busca de aluno.
- Lista de treinos cadastrados.
- Exercícios.
- Séries.
- Repetições.
- Carga.
- Observações.
- Botões de criar, editar, consultar e excluir treino.

**Requisitos relacionados:**

- Caso de uso CSU02 — Gerenciar Treinos dos Alunos.

**Observação:**  
Esta tela deve ser incluída somente se o grupo decidir manter a funcionalidade de treinos no escopo do Fit-Admin. Caso contrário, recomenda-se remover essa seção e ajustar a especificação de requisitos.

---

### 4.3.11 Aplicação das Regras de Design e Usabilidade

O projeto de interface do Fit-Admin deve observar princípios de usabilidade e ergonomia, buscando reduzir erros e facilitar o aprendizado do sistema.

**Consistência:**  
Botões, menus, mensagens e formulários devem seguir o mesmo padrão visual em todas as telas.

**Feedback:**  
O sistema deve informar ao usuário quando uma ação for concluída com sucesso ou quando houver erro.

**Prevenção de erros:**  
Campos obrigatórios devem ser destacados e validados antes do envio.

**Simplicidade:**  
As telas devem apresentar apenas as informações necessárias para a tarefa atual.

**Navegação clara:**  
O menu principal deve permitir acesso rápido a alunos, pagamentos, relatórios e configurações.

**Acessibilidade:**  
A interface deve usar contraste adequado, textos legíveis e botões com tamanho suficiente para uso em dispositivos móveis.

**Responsividade:**  
A aplicação deve se adaptar a diferentes tamanhos de tela, mantendo a usabilidade em desktop, tablet e smartphone.

---

## 4.4 Testes com Protótipos

Os testes com protótipos terão como objetivo avaliar se os usuários conseguem executar as principais tarefas do Fit-Admin de forma simples, rápida e sem dúvidas significativas.

---

### 4.4.1 Objetivos dos Testes

- Verificar se a navegação é clara.
- Avaliar se os usuários conseguem cadastrar alunos sem dificuldade.
- Verificar se a busca e os filtros são compreensíveis.
- Avaliar a clareza das mensagens de erro e confirmação.
- Validar se a interface atende aos perfis de gestor, recepcionista, financeiro e professor/instrutor.
- Identificar melhorias antes da implementação final.

---

### 4.4.2 Perfil dos Participantes

Os testes devem ser aplicados com usuários que representem os perfis definidos nas personas.

| Participante | Perfil Representado    | Objetivo do Teste                                            |
| ------------ | ---------------------- | ------------------------------------------------------------ |
| Usuário 1    | Gestor de Academia     | Avaliar dashboard, listagem, filtros e relatórios.           |
| Usuário 2    | Recepcionista          | Avaliar cadastro, edição e busca de alunos.                  |
| Usuário 3    | Funcionário Financeiro | Avaliar controle de pagamentos e inadimplência.              |
| Usuário 4    | Professor/Instrutor    | Avaliar consulta de alunos e, se aplicável, tela de treinos. |

---

### 4.4.3 Tarefas Propostas

| Código | Tarefa                                     | Resultado Esperado                                           |
| ------ | ------------------------------------------ | ------------------------------------------------------------ |
| T01    | Realizar login no sistema.                 | Usuário acessa a tela inicial com sucesso.                   |
| T02    | Cadastrar um novo aluno.                   | Aluno é salvo e mensagem de confirmação é exibida.           |
| T03    | Buscar aluno por nome, telefone ou e-mail. | Sistema exibe o aluno correspondente.                        |
| T04    | Editar dados de um aluno.                  | Dados são atualizados corretamente.                          |
| T05    | Excluir cadastro de aluno.                 | Sistema solicita confirmação e remove o cadastro.            |
| T06    | Filtrar alunos por plano.                  | Lista apresenta apenas alunos do plano selecionado.          |
| T07    | Exportar lista de alunos em CSV.           | Arquivo CSV é gerado corretamente.                           |
| T08    | Imprimir lista de alunos.                  | Sistema apresenta versão adequada para impressão.            |
| T09    | Registrar pagamento de aluno.              | Pagamento é salvo e status é atualizado.                     |
| T10    | Verificar alunos inadimplentes.            | Sistema apresenta lista de alunos com pendências.            |
| T11    | Alterar senha de usuário.                  | Senha é alterada após validação dos campos.                  |
| T12    | Gerenciar treino de aluno.                 | Tarefa aplicável somente se o módulo de treinos for mantido. |

---

### 4.4.4 Critérios de Avaliação

Durante os testes, deverão ser observados os seguintes critérios:

- Tempo necessário para concluir cada tarefa.
- Quantidade de erros cometidos.
- Dúvidas apresentadas pelo usuário.
- Clareza dos textos, botões e mensagens.
- Facilidade de navegação.
- Compatibilidade com dispositivos móveis.
- Satisfação geral do participante.

---

### 4.4.5 Instrumento de Registro dos Testes

| Participante | Tarefa | Concluiu? | Tempo aproximado | Dificuldades observadas | Sugestões do usuário |
| ------------ | ------ | --------- | ---------------- | ----------------------- | -------------------- |
| Usuário 1    | T01    | Sim/Não   |                  |                         |                      |
| Usuário 1    | T02    | Sim/Não   |                  |                         |                      |
| Usuário 2    | T03    | Sim/Não   |                  |                         |                      |
| Usuário 3    | T09    | Sim/Não   |                  |                         |                      |
| Usuário 4    | T12    | Sim/Não   |                  |                         |                      |

---

### 4.4.6 Resultados Esperados

Espera-se que os usuários consigam executar as tarefas principais sem necessidade de orientação técnica avançada. O sistema deve apresentar navegação intuitiva, mensagens claras e organização visual adequada aos diferentes perfis de uso.

Os principais pontos a serem validados são:

- Facilidade no cadastro de alunos.
- Eficiência na busca e filtragem.
- Clareza na visualização dos dados.
- Segurança nas ações de edição e exclusão.
- Simplicidade no controle de pagamentos.
- Boa adaptação em telas menores.
- Coerência entre funcionalidades projetadas e escopo final do sistema.

---

### 4.4.7 Melhorias Previstas Após os Testes

Após a aplicação dos testes, o grupo deverá consolidar os resultados e definir ajustes no protótipo. Possíveis melhorias incluem:

- Reorganização dos campos do formulário de cadastro.
- Ajuste nos textos de botões e mensagens.
- Melhoria na visualização de status financeiro.
- Inclusão de filtros adicionais.
- Ajustes de responsividade.
- Remoção ou adequação do módulo de treinos, conforme decisão de escopo.
- Melhoria no contraste e acessibilidade visual.

---

## Considerações Finais

O design de interação proposto para o Fit-Admin busca atender às necessidades administrativas de academias, priorizando simplicidade, agilidade, segurança e clareza. A aplicação deve permitir que gestores, recepcionistas, funcionários financeiros e demais usuários executem suas tarefas com o mínimo de dificuldade, reduzindo o uso de controles manuais e melhorando a confiabilidade das informações.

A versão final deste documento deverá ser complementada com imagens dos protótipos de alta fidelidade, preferencialmente elaborados em ferramenta visual como Figma, Canva ou outra solução equivalente.
