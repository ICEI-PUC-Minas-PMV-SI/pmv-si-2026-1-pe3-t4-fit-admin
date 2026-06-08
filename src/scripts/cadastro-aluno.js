const usuarioAtual = Auth.getUsuarioAtual();
if (!usuarioAtual) {
  window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get("edit");
const isEditing = Boolean(editId);

document.querySelector(".dashboard-title").textContent =
  "Fit-Admin - " + usuarioAtual.empresa;
document.querySelector(".cadastro-title").textContent = isEditing
  ? "Editar Aluno"
  : "Cadastrar Aluno";
document.querySelector(".cadastro-btn").textContent = isEditing
  ? "Salvar Alterações"
  : "Cadastrar";

function getInputValue(id) {
  return document.getElementById(id).shadowRoot.querySelector("input").value.trim();
}

function setInputValue(id, value) {
  const input = document.getElementById(id)?.shadowRoot?.querySelector("input");
  if (input) input.value = value || "";
}

function preencherCampos(aluno) {
  if (!aluno) return;

  setInputValue("cadastro-nome", aluno.nome);
  setInputValue("cadastro-matricula", aluno.matricula);
  setInputValue("cadastro-email", aluno.email);
  setInputValue("cadastro-vencimento", aluno.vencimento);
  setInputValue("cadastro-peso", aluno.peso);
  setInputValue("cadastro-altura", aluno.altura);
  setInputValue("cadastro-telefone", aluno.telefone);
  document.getElementById("cadastro-plano").value = aluno.plano || "";
  document.getElementById("cadastro-status").value = aluno.status || "ativo";

  const fotoPreview = document.getElementById("cadastro-photo-preview");
  if (fotoPreview && aluno.foto) {
    fotoPreview.src = aluno.foto;
  }
}

if (isEditing) {
  const aluno = AppData.normalizarAlunos().find((item) => item.id === editId);
  setTimeout(() => preencherCampos(aluno), 100);
}

document.getElementById("btn-voltar").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

document
  .getElementById("cadastro-upload-btn")
  .addEventListener("click", function () {
    document.getElementById("cadastro-photo").click();
  });

document
  .getElementById("cadastro-photo")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        document.getElementById("cadastro-photo-preview").src =
          ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

document
  .getElementById("cadastroAlunoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const aluno = {
      id: editId || AppData.criarId("aluno"),
      nome: getInputValue("cadastro-nome"),
      matricula: getInputValue("cadastro-matricula"),
      email: getInputValue("cadastro-email"),
      plano: document.getElementById("cadastro-plano").value,
      status: document.getElementById("cadastro-status").value,
      vencimento: getInputValue("cadastro-vencimento"),
      peso: getInputValue("cadastro-peso"),
      altura: getInputValue("cadastro-altura"),
      telefone: getInputValue("cadastro-telefone"),
      foto: document.getElementById("cadastro-photo-preview").src,
    };

    if (
      !aluno.nome ||
      !aluno.matricula ||
      !aluno.email ||
      !aluno.plano ||
      !aluno.vencimento ||
      !aluno.peso ||
      !aluno.altura ||
      !aluno.telefone
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const alunos = AppData.normalizarAlunos();
    const matriculaExiste = alunos.some(
      (item) => item.id !== aluno.id && item.matricula === aluno.matricula
    );

    if (matriculaExiste) {
      alert("Já existe um aluno com esta matrícula.");
      return;
    }

    const novosAlunos = isEditing
      ? alunos.map((item) => (item.id === editId ? aluno : item))
      : [...alunos, aluno];

    AppData.setAlunos(novosAlunos);
    alert(isEditing ? "Aluno atualizado com sucesso." : "Aluno cadastrado com sucesso.");
    window.location.replace("dashboard.html");
  });
