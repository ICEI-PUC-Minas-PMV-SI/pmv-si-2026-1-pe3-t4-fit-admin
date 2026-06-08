const usuarioAtual = Auth.getUsuarioAtual();
if (!usuarioAtual) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const studentsGrid = document.getElementById("students-grid");
  const metricsGrid = document.getElementById("metrics-grid");
  const openBtn = document.querySelector(".btn-white");
  const searchInput = document.querySelector(".search-input");
  const logoutBtn = document.querySelector(".logout-btn");
  const planoFilter = document.getElementById("plano-filter");
  const statusFilter = document.getElementById("status-filter");
  const exportBtn = document.getElementById("exportar-btn");
  const imprimirBtn = document.getElementById("imprimir-btn");
  const navFuncionarios = document.querySelector('a[href="funcionarios.html"]');

  if (usuarioAtual.tipo === "funcionario" && navFuncionarios) {
    navFuncionarios.style.display = "none";
  }

  document.querySelector(".dashboard-title").textContent =
    "Fit-Admin - " + usuarioAtual.empresa;

  function getAlunosAtualizados() {
    return AppData.atualizarStatusAlunosPorPagamentos();
  }

  function renderMetrics(alunos) {
    const pagamentos = AppData.getPagamentos();
    const statusPagamentos = pagamentos.map((pagamento) =>
      AppData.getStatusPagamento(pagamento)
    );
    const porPlano = alunos.reduce((acc, aluno) => {
      const plano = aluno.plano || "sem plano";
      acc[plano] = (acc[plano] || 0) + 1;
      return acc;
    }, {});

    const metrics = [
      { label: "Total de alunos", value: alunos.length },
      {
        label: "Alunos ativos",
        value: alunos.filter((aluno) => aluno.status === "ativo").length,
      },
      {
        label: "Inadimplentes",
        value: alunos.filter((aluno) => aluno.status === "inadimplente").length,
      },
      {
        label: "Pagamentos em dia",
        value: statusPagamentos.filter((status) => status === "pago").length,
      },
      {
        label: "Pagamentos pendentes",
        value: statusPagamentos.filter((status) => status !== "pago").length,
      },
      {
        label: "Planos",
        value: Object.entries(porPlano)
          .map(([plano, total]) => `${plano}: ${total}`)
          .join(" | ") || "0",
      },
    ];

    metricsGrid.innerHTML = metrics
      .map(
        (metric) => `
          <article class="metric-card">
            <span>${metric.label}</span>
            <strong>${AppData.escapeHTML(metric.value)}</strong>
          </article>
        `
      )
      .join("");
  }

  function getAlunosFiltrados() {
    const termo = searchInput.value.toLowerCase().trim();
    const plano = planoFilter.value;
    const status = statusFilter.value;

    return getAlunosAtualizados().filter((aluno) => {
      const textoBusca = [aluno.nome, aluno.telefone, aluno.email]
        .join(" ")
        .toLowerCase();
      const passaBusca = !termo || textoBusca.includes(termo);
      const passaPlano = !plano || aluno.plano === plano;
      const passaStatus = !status || aluno.status === status;
      return passaBusca && passaPlano && passaStatus;
    });
  }

  function renderStudents() {
    const alunos = getAlunosFiltrados();
    renderMetrics(getAlunosAtualizados());
    studentsGrid.innerHTML = "";

    if (!alunos.length) {
      studentsGrid.innerHTML = `
        <div class="no-students">
          <span class="material-icons">group_off</span>
          <p>Nenhum aluno encontrado</p>
        </div>
      `;
      return;
    }

    alunos.forEach((aluno) => {
      const card = document.createElement("div");
      card.className = `student-card status-${aluno.status}`;
      card.innerHTML = `
        <img class="student-photo" src="${
          aluno.foto || "../assets/user-placeholder.png"
        }" alt="Foto do aluno">
        <div class="student-info">
          <div class="student-header">
            <span class="student-name">${AppData.escapeHTML(aluno.nome)}</span>
            <div class="student-actions">
              <span class="material-icons edit" data-id="${aluno.id}">edit</span>
              <span class="material-icons delete" data-id="${aluno.id}">delete</span>
            </div>
          </div>
          <div class="student-plan">Plano: <b>${AppData.escapeHTML(
            aluno.plano || "-"
          )}</b></div>
          <div class="student-details">
            <span>Status <b>${AppData.escapeHTML(aluno.status || "-")}</b></span>
            <span>Telefone <b>${AppData.escapeHTML(aluno.telefone || "-")}</b></span>
            <span>E-mail <b>${AppData.escapeHTML(aluno.email || "-")}</b></span>
            <span>Vencimento <b>${AppData.escapeHTML(aluno.vencimento || "-")}</b></span>
            <span>Peso <b>${AppData.escapeHTML(aluno.peso || "-")}</b></span>
            <span>Altura <b>${AppData.escapeHTML(aluno.altura || "-")}</b></span>
          </div>
        </div>
      `;

      card.querySelector(".delete").addEventListener("click", function () {
        if (confirm(`Excluir ${aluno.nome}?`)) {
          AppData.setAlunos(
            AppData.normalizarAlunos().filter((item) => item.id !== aluno.id)
          );
          AppData.setPagamentos(
            AppData.getPagamentos().filter(
              (pagamento) => pagamento.alunoId !== aluno.id
            )
          );
          AppData.setTreinos(
            AppData.getTreinos().filter((treino) => treino.alunoId !== aluno.id)
          );
          alert("Aluno excluído com sucesso.");
          renderStudents();
        }
      });

      card.querySelector(".edit").addEventListener("click", function () {
        window.location.href = `cadastro-aluno.html?edit=${encodeURIComponent(
          aluno.id
        )}`;
      });

      studentsGrid.appendChild(card);
    });
  }

  function exportarAlunosCSV() {
    const alunos = getAlunosFiltrados();

    if (!alunos.length) {
      alert("Não há alunos para exportar.");
      return;
    }

    const headers = [
      "Nome",
      "Matrícula",
      "Telefone",
      "Email",
      "Plano",
      "Status",
      "Vencimento",
      "Peso",
      "Altura",
    ];
    const csvContent = [
      headers.join(","),
      ...alunos.map((aluno) =>
        [
          aluno.nome,
          aluno.matricula,
          aluno.telefone,
          aluno.email,
          aluno.plano,
          aluno.status,
          aluno.vencimento,
          aluno.peso,
          aluno.altura,
        ]
          .map((valor) => `"${String(valor || "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const dataFormatada = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `alunos_fit_admin_${dataFormatada}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert("Exportação CSV concluída.");
  }

  function imprimirListaAlunos() {
    const alunos = getAlunosFiltrados();

    if (!alunos.length) {
      alert("Não há alunos para imprimir.");
      return;
    }

    const linhas = alunos
      .map(
        (aluno) => `
          <tr>
            <td>${AppData.escapeHTML(aluno.nome || "-")}</td>
            <td>${AppData.escapeHTML(aluno.telefone || "-")}</td>
            <td>${AppData.escapeHTML(aluno.email || "-")}</td>
            <td>${AppData.escapeHTML(aluno.plano || "-")}</td>
            <td>${AppData.escapeHTML(aluno.status || "-")}</td>
            <td>${AppData.escapeHTML(aluno.vencimento || "-")}</td>
          </tr>
        `
      )
      .join("");

    const janelaImpressao = window.open("", "_blank", "width=900,height=700");
    janelaImpressao.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Lista de Alunos - Fit-Admin</title>
        <link rel="stylesheet" href="../styles/imprimir.css">
      </head>
      <body>
        <div class="header">
          <h1>Fit-Admin - ${AppData.escapeHTML(usuarioAtual.empresa)}</h1>
          <p>Lista de alunos - ${new Date().toLocaleDateString("pt-BR")}</p>
        </div>
        <div class="summary"><strong>Total: ${alunos.length}</strong></div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Plano</th>
              <th>Status</th>
              <th>Vencimento</th>
            </tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
      </body>
      </html>
    `);
    janelaImpressao.document.close();
    janelaImpressao.onload = function () {
      janelaImpressao.focus();
      janelaImpressao.print();
    };
  }

  [searchInput, planoFilter, statusFilter].forEach((element) => {
    element.addEventListener("input", renderStudents);
    element.addEventListener("change", renderStudents);
  });

  logoutBtn.addEventListener("click", function () {
    Auth.logout();
    window.location.href = "login.html";
  });

  openBtn.addEventListener("click", function () {
    window.location.href = "cadastro-aluno.html";
  });

  exportBtn.addEventListener("click", exportarAlunosCSV);
  imprimirBtn.addEventListener("click", imprimirListaAlunos);

  renderStudents();
});
