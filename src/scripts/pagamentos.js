const usuarioAtual = Auth.getUsuarioAtual();
if (!usuarioAtual) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pagamento-form");
  const alunoSelect = document.getElementById("aluno-id");
  const lista = document.getElementById("pagamentos-lista");
  const busca = document.getElementById("busca-pagamento");
  const statusFilter = document.getElementById("status-filter");
  const periodoInicio = document.getElementById("periodo-inicio");
  const periodoFim = document.getElementById("periodo-fim");
  const exportBtn = document.getElementById("exportar-pagamentos");

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
    const alunos = AppData.normalizarAlunos();
    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
    alunos.forEach((aluno) => {
      const option = document.createElement("option");
      option.value = aluno.id;
      option.textContent = `${aluno.nome} - ${aluno.matricula || "sem matrícula"}`;
      alunoSelect.appendChild(option);
    });
  }

  function getPagamentosFiltrados() {
    const alunosMap = getAlunosMap();
    const termo = busca.value.toLowerCase().trim();
    const status = statusFilter.value;
    const inicio = periodoInicio.value;
    const fim = periodoFim.value;

    return AppData.getPagamentos().filter((pagamento) => {
      const aluno = alunosMap[pagamento.alunoId];
      const nomeAluno = aluno?.nome?.toLowerCase() || "";
      const statusAtual = AppData.getStatusPagamento(pagamento);
      const passaBusca = !termo || nomeAluno.includes(termo);
      const passaStatus = !status || statusAtual === status;
      const passaInicio = !inicio || pagamento.vencimento >= inicio;
      const passaFim = !fim || pagamento.vencimento <= fim;
      return passaBusca && passaStatus && passaInicio && passaFim;
    });
  }

  function renderPagamentos() {
    const alunosMap = getAlunosMap();
    const pagamentos = getPagamentosFiltrados();

    if (!pagamentos.length) {
      lista.innerHTML = '<div class="no-students"><p>Nenhum pagamento encontrado</p></div>';
      return;
    }

    lista.innerHTML = pagamentos
      .map((pagamento) => {
        const aluno = alunosMap[pagamento.alunoId];
        const statusAtual = AppData.getStatusPagamento(pagamento);
        return `
          <article class="record-card status-${statusAtual}">
            <div class="record-header">
              <div>
                <div class="record-title">${AppData.escapeHTML(
                  aluno?.nome || "Aluno removido"
                )}</div>
                <div class="record-meta">
                  <span>Status: <b>${AppData.escapeHTML(statusAtual)}</b></span>
                  <span>Valor: <b>R$ ${Number(pagamento.valor || 0).toFixed(2)}</b></span>
                  <span>Vencimento: <b>${AppData.escapeHTML(pagamento.vencimento)}</b></span>
                  <span>Pagamento: <b>${AppData.escapeHTML(pagamento.dataPagamento || "-")}</b></span>
                  <span>Forma: <b>${AppData.escapeHTML(pagamento.formaPagamento || "-")}</b></span>
                </div>
              </div>
              <div class="record-actions">
                <span class="material-icons delete" data-id="${pagamento.id}">delete</span>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    lista.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", function () {
        if (confirm("Excluir este pagamento?")) {
          const id = this.dataset.id;
          AppData.setPagamentos(
            AppData.getPagamentos().filter((pagamento) => pagamento.id !== id)
          );
          AppData.atualizarStatusAlunosPorPagamentos();
          renderPagamentos();
        }
      });
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const pagamento = {
      id: AppData.criarId("pagamento"),
      alunoId: alunoSelect.value,
      valor: document.getElementById("valor").value,
      vencimento: document.getElementById("vencimento").value,
      dataPagamento: document.getElementById("data-pagamento").value,
      formaPagamento: document.getElementById("forma-pagamento").value,
      status: document.getElementById("status").value,
    };

    if (
      !pagamento.alunoId ||
      !pagamento.valor ||
      !pagamento.vencimento ||
      !pagamento.formaPagamento ||
      !pagamento.status
    ) {
      alert("Preencha todos os campos obrigatórios do pagamento.");
      return;
    }

    if (pagamento.status === "pago" && !pagamento.dataPagamento) {
      alert("Informe a data de pagamento para registros pagos.");
      return;
    }

    AppData.setPagamentos([...AppData.getPagamentos(), pagamento]);
    AppData.atualizarStatusAlunosPorPagamentos();
    form.reset();
    alert("Pagamento registrado com sucesso.");
    renderPagamentos();
  });

  function exportarCSV() {
    const alunosMap = getAlunosMap();
    const pagamentos = getPagamentosFiltrados();
    if (!pagamentos.length) {
      alert("Não há pagamentos para exportar.");
      return;
    }

    const csv = [
      ["Aluno", "Valor", "Vencimento", "Pagamento", "Forma", "Status"].join(","),
      ...pagamentos.map((pagamento) =>
        [
          alunosMap[pagamento.alunoId]?.nome || "Aluno removido",
          pagamento.valor,
          pagamento.vencimento,
          pagamento.dataPagamento,
          pagamento.formaPagamento,
          AppData.getStatusPagamento(pagamento),
        ]
          .map((valor) => `"${String(valor || "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pagamentos_fit_admin_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  [busca, statusFilter, periodoInicio, periodoFim].forEach((element) => {
    element.addEventListener("input", renderPagamentos);
    element.addEventListener("change", renderPagamentos);
  });
  exportBtn.addEventListener("click", exportarCSV);

  popularAlunos();
  renderPagamentos();
});
