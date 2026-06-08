# Fit-Admin

Aplicação estática em HTML, CSS e JavaScript para gestão administrativa de academias.

## Como executar

Abra `pages/index.html` diretamente no navegador ou execute um servidor estático:

```bash
python3 -m http.server 8000 -d src
```

Depois acesse `http://localhost:8000/pages/index.html`.

## Telas principais

- `pages/login.html`: autenticação de gestores e funcionários.
- `pages/dashboard.html`: indicadores, busca, filtros, exportação e impressão de alunos.
- `pages/cadastro-aluno.html`: cadastro e edição de alunos.
- `pages/pagamentos.html`: registro, consulta, filtros e exportação de pagamentos.
- `pages/treinos.html`: cadastro, consulta, edição e exclusão de treinos.
- `pages/funcionarios.html`: gestão de funcionários pelo gestor.
- `pages/alterar-senha.html`: alteração da senha do usuário logado.

## Persistência

Os dados são salvos no `localStorage` do navegador nas chaves `usuarios` e `usuarioAtual`. Esta persistência é adequada para demonstração e uso local, não para produção com dados sensíveis.

## Limitações

O projeto não possui backend, banco de dados externo ou testes automatizados configurados. Valide manualmente login, cadastro de alunos, pagamentos, treinos, filtros, exportação, impressão e responsividade.
