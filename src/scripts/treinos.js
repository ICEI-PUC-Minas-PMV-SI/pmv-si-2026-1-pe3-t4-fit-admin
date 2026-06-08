const usuarioAtual = Auth.getUsuarioAtual();
if (!usuarioAtual) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("treino-form");
  const lista = document.getElementById("treinos-lista");
  const alunoSelect = document.getElementById("aluno-id");
  const busca = document.getElementById("busca-treino");
  const treinoId = document.getElementById("treino-id");
  const cancelarEdicao = document.getElementById("cancelar-edicao");
  const formTitle = document.getElementById("treino-form-title");

  document.querySelector(".dashboard-title").textContent =
    "Fit-Admin - " + usuarioAtual.empresa;

  if (usuarioAtual.tipo === "funcionario") {
    document.querySelectorAll(".admin-only").forEach((item) => {
      item.style.display = "none";
    });
  }

  document.querySelector(".logout-btn").addEventListener("click", function () {
    Auth.logout();
    window.location.href = "login.html";
  });

  function getAlunosMap() {
    return AppData.normalizarAlunos().reduce((acc, aluno) => {
      acc[aluno.id] = aluno;
      return acc;
    }, {});
  }

  function popularAlunos() {
    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
    AppData.normalizarAlunos().forEach((aluno) => {
      const option = document.createElement("option");
      option.value = aluno.id;
      option.textContent = `${aluno.nome} - ${aluno.matricula || "sem matrícula"}`;
      alunoSelect.appendChild(option);
    });
  }

  function limparFormulario() {
    form.reset();
    treinoId.value = "";
    formTitle.textContent = "Criar treino";
    cancelarEdicao.style.display = "none";
  }

  function getTreinosFiltrados() {
    const alunosMap = getAlunosMap();
    const termo = busca.value.toLowerCase().trim();

    return AppData.getTreinos().filter((treino) => {
      const aluno = alunosMap[treino.alunoId];
      const texto = [aluno?.nome, treino.exercicios, treino.observacoes]
        .join(" ")
        .toLowerCase();
      return !termo || texto.includes(termo);
    });
  }

  function renderTreinos() {
    const alunosMap = getAlunosMap();
    const treinos = getTreinosFiltrados();

    if (!treinos.length) {
      lista.innerHTML = '<div class="no-students"><p>Nenhum treino encontrado</p></div>';
      return;
    }

    lista.innerHTML = treinos
      .map((treino) => {
        const aluno = alunosMap[treino.alunoId];
        return `
          <article class="record-card">
            <div class="record-header">
              <div>
                <div class="record-title">${AppData.escapeHTML(
                  aluno?.nome || "Aluno removido"
                )}</div>
                <div class="record-meta">
                  <span>Exercícios: <b>${AppData.escapeHTML(treino.exercicios)}</b></span>
                  <span>Séries: <b>${AppData.escapeHTML(treino.series)}</b></span>
                  <span>Repetições: <b>${AppData.escapeHTML(treino.repeticoes)}</b></span>
                  <span>Carga: <b>${AppData.escapeHTML(treino.carga || "-")}</b></span>
                  <span>Atualizado: <b>${AppData.escapeHTML(treino.atualizadoEm)}</b></span>
                </div>
                ${
                  treino.observacoes
                    ? `<p>${AppData.escapeHTML(treino.observacoes)}</p>`
                    : ""
                }
              </div>
              <div class="record-actions">
                <span class="material-icons edit" data-id="${treino.id}">edit</span>
                <span class="material-icons delete" data-id="${treino.id}">delete</span>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    lista.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", function () {
        const treino = AppData.getTreinos().find(
          (item) => item.id === this.dataset.id
        );
        if (!treino) return;
        treinoId.value = treino.id;
        alunoSelect.value = treino.alunoId;
        document.getElementById("exercicios").value = treino.exercicios;
        document.getElementById("series").value = treino.series;
        document.getElementById("repeticoes").value = treino.repeticoes;
        document.getElementById("carga").value = treino.carga || "";
        document.getElementById("observacoes").value = treino.observacoes || "";
        formTitle.textContent = "Editar treino";
        cancelarEdicao.style.display = "inline-flex";
      });
    });

    lista.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", function () {
        if (confirm("Excluir este treino?")) {
          AppData.setTreinos(
            AppData.getTreinos().filter((treino) => treino.id !== this.dataset.id)
          );
          renderTreinos();
        }
      });
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const treino = {
      id: treinoId.value || AppData.criarId("treino"),
      alunoId: alunoSelect.value,
      exercicios: document.getElementById("exercicios").value.trim(),
      series: document.getElementById("series").value.trim(),
      repeticoes: document.getElementById("repeticoes").value.trim(),
      carga: document.getElementById("carga").value.trim(),
      observacoes: document.getElementById("observacoes").value.trim(),
      atualizadoEm: new Date().toLocaleDateString("pt-BR"),
    };

    if (!treino.alunoId || !treino.exercicios || !treino.series || !treino.repeticoes) {
      alert("Preencha aluno, exercícios, séries e repetições.");
      return;
    }

    const treinos = AppData.getTreinos();
    const novosTreinos = treinoId.value
      ? treinos.map((item) => (item.id === treino.id ? treino : item))
      : [...treinos, treino];

    AppData.setTreinos(novosTreinos);
    alert("Treino salvo com sucesso.");
    limparFormulario();
    renderTreinos();
  });

  busca.addEventListener("input", renderTreinos);
  cancelarEdicao.addEventListener("click", limparFormulario);
  cancelarEdicao.style.display = "none";

  popularAlunos();
  renderTreinos();
});
