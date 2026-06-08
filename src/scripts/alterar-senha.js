const usuarioAtual = Auth.getUsuarioAtual();
if (!usuarioAtual) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
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

  document.getElementById("senha-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const senhaAtual = document.getElementById("senha-atual").value;
    const novaSenha = document.getElementById("nova-senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    const resultado = Auth.alterarSenha(senhaAtual, novaSenha);
    alert(resultado.mensagem);

    if (resultado.ok) {
      this.reset();
    }
  });
});
