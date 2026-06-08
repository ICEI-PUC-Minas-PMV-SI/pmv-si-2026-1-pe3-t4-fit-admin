const usuarioAtual = Auth.getUsuarioAtual();
if (!usuarioAtual) {
  window.location.href = "login.html";
}
if (usuarioAtual.tipo === "funcionario") {
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-funcionario");
  const btnNovo = document.getElementById("btn-novo-funcionario");
  const btnClose = document.querySelector(".close-btn");
  const formFuncionario = document.getElementById("form-funcionario");
  const funcionariosGrid = document.getElementById("funcionarios-grid");
  const modalTitle = document.querySelector(".modal-header h2");
  const submitBtn = formFuncionario.querySelector("button[type='submit']");
  let editandoIndex = null;

  document.querySelector(".dashboard-title").textContent =
    "Fit-Admin - " + usuarioAtual.empresa;

  function limparFormularioFuncionario() {
    ["nome", "email", "senha", "confirmar-senha"].forEach((id) => {
      const input = document.getElementById(id)?.shadowRoot?.querySelector("input");
      if (input) input.value = "";
    });
  }

  if (!usuarioAtual.funcionarios) {
    usuarioAtual.funcionarios = [];
    Auth.atualizarUsuarioAtual(usuarioAtual);
  }

  function renderFuncionarios() {
    funcionariosGrid.innerHTML = "";

    if (!usuarioAtual.funcionarios || usuarioAtual.funcionarios.length === 0) {
      funcionariosGrid.innerHTML = `
        <div class="no-funcionarios">
          <span class="material-icons">group_off</span>
          <p>Nenhum funcionário cadastrado</p>
        </div>
      `;
      return;
    }

    usuarioAtual.funcionarios.forEach((funcionario, idx) => {
      const card = document.createElement("div");
      card.className = "funcionario-card";
      card.innerHTML = `
        <div class="funcionario-header">
          <div>
            <div class="funcionario-nome">${funcionario.nome}</div>
            <div class="funcionario-email">${funcionario.email}</div>
          </div>
          <div class="funcionario-actions">
            <span class="material-icons edit" data-idx="${idx}">edit</span>
            <span class="material-icons delete" data-idx="${idx}">delete</span>
          </div>
        </div>
      `;

      card.querySelector(".delete").addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir este funcionário?")) {
          usuarioAtual.funcionarios.splice(idx, 1);
          Auth.atualizarUsuarioAtual(usuarioAtual);
          renderFuncionarios();
        }
      });

      card.querySelector(".edit").addEventListener("click", function () {
        editandoIndex = idx;
        const funcionario = usuarioAtual.funcionarios[idx];

        document
          .getElementById("nome")
          .shadowRoot.querySelector("input").value = funcionario.nome;
        document
          .getElementById("email")
          .shadowRoot.querySelector("input").value = funcionario.email;
        document
          .getElementById("senha")
          .shadowRoot.querySelector("input").value = "";
        document
          .getElementById("confirmar-senha")
          .shadowRoot.querySelector("input").value = "";

        modalTitle.textContent = "Editar Funcionário";
        submitBtn.textContent = "Salvar Alterações";
        modal.classList.add("active");
      });

      funcionariosGrid.appendChild(card);
    });
  }

  btnNovo.addEventListener("click", function () {
    editandoIndex = null;
    modalTitle.textContent = "Novo Funcionário";
    submitBtn.textContent = "Cadastrar";
    limparFormularioFuncionario();
    modal.classList.add("active");
  });

  btnClose.addEventListener("click", function () {
    modal.classList.remove("active");
    limparFormularioFuncionario();
    editandoIndex = null;
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      limparFormularioFuncionario();
      editandoIndex = null;
    }
  });

  formFuncionario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document
      .getElementById("nome")
      .shadowRoot.querySelector("input")
      .value.trim();
    const email = document
      .getElementById("email")
      .shadowRoot.querySelector("input")
      .value.trim();
    const senha = document
      .getElementById("senha")
      .shadowRoot.querySelector("input").value;
    const confirmarSenha = document
      .getElementById("confirmar-senha")
      .shadowRoot.querySelector("input").value;

    if (!nome || !email) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (editandoIndex === null && (!senha || !confirmarSenha)) {
      alert("Por favor, preencha a senha e confirmação.");
      return;
    }

    if (senha && senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const emailExiste = usuarioAtual.funcionarios.some(
      (f, idx) =>
        idx !== editandoIndex && f.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExiste) {
      alert("Este email já está cadastrado.");
      return;
    }

    const funcionarioData = {
      nome,
      email,
      senha: senha || usuarioAtual.funcionarios[editandoIndex]?.senha,
      tipo: "funcionario",
    };

    if (editandoIndex !== null) {
      usuarioAtual.funcionarios[editandoIndex] = funcionarioData;
    } else {
      usuarioAtual.funcionarios.push(funcionarioData);
    }

    Auth.atualizarUsuarioAtual(usuarioAtual);
    modal.classList.remove("active");
    limparFormularioFuncionario();
    editandoIndex = null;
    renderFuncionarios();
  });

  document.querySelector(".logout-btn").addEventListener("click", function () {
    Auth.logout();
    window.location.href = "login.html";
  });

  renderFuncionarios();
});
