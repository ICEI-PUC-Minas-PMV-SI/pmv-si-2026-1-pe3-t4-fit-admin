const AppData = {
  getUsuarioAtual() {
    return Auth.getUsuarioAtual();
  },

  getAdminEmpresa() {
    const usuarioAtual = this.getUsuarioAtual();
    if (!usuarioAtual || usuarioAtual.tipo !== "funcionario") {
      return usuarioAtual;
    }

    return Auth.getUsuarios().find(
      (user) =>
        user.empresa === usuarioAtual.empresa &&
        user.funcionarios?.some(
          (funcionario) =>
            funcionario.email.toLowerCase() === usuarioAtual.email.toLowerCase()
        )
    );
  },

  salvarAdmin(admin) {
    if (!admin) return;

    const usuarioAtual = this.getUsuarioAtual();
    const usuarios = Auth.getUsuarios();
    const index = usuarios.findIndex(
      (user) => user.email.toLowerCase() === admin.email.toLowerCase()
    );

    if (index !== -1) {
      usuarios[index] = admin;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    if (usuarioAtual?.tipo !== "funcionario") {
      localStorage.setItem("usuarioAtual", JSON.stringify(admin));
    }
  },

  criarId(prefixo) {
    return `${prefixo}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  },

  normalizarAlunos() {
    const admin = this.getAdminEmpresa();
    if (!admin) return [];

    let alterou = false;
    const alunos = (admin.alunos || []).map((aluno) => {
      const alunoNormalizado = { ...aluno };
      if (!alunoNormalizado.id) {
        alunoNormalizado.id =
          alunoNormalizado.matricula || this.criarId("aluno");
        alterou = true;
      }
      if (!alunoNormalizado.status) {
        alunoNormalizado.status = "ativo";
        alterou = true;
      }
      if (!alunoNormalizado.email) {
        alunoNormalizado.email = "";
        alterou = true;
      }
      return alunoNormalizado;
    });

    if (alterou) {
      admin.alunos = alunos;
      this.salvarAdmin(admin);
    }

    return alunos;
  },

  setAlunos(alunos) {
    const admin = this.getAdminEmpresa();
    if (!admin) return;
    admin.alunos = alunos;
    this.salvarAdmin(admin);
  },

  getPagamentos() {
    const admin = this.getAdminEmpresa();
    if (!admin) return [];
    if (!admin.pagamentos) {
      admin.pagamentos = [];
      this.salvarAdmin(admin);
    }
    return admin.pagamentos;
  },

  setPagamentos(pagamentos) {
    const admin = this.getAdminEmpresa();
    if (!admin) return;
    admin.pagamentos = pagamentos;
    this.salvarAdmin(admin);
  },

  getTreinos() {
    const admin = this.getAdminEmpresa();
    if (!admin) return [];
    if (!admin.treinos) {
      admin.treinos = [];
      this.salvarAdmin(admin);
    }
    return admin.treinos;
  },

  setTreinos(treinos) {
    const admin = this.getAdminEmpresa();
    if (!admin) return;
    admin.treinos = treinos;
    this.salvarAdmin(admin);
  },

  getStatusPagamento(pagamento) {
    if (pagamento.status === "pago") return "pago";
    if (!pagamento.vencimento) return pagamento.status || "pendente";

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const vencimento = new Date(`${pagamento.vencimento}T00:00:00`);

    return vencimento < hoje ? "vencido" : "pendente";
  },

  atualizarStatusAlunosPorPagamentos() {
    const alunos = this.normalizarAlunos();
    const pagamentos = this.getPagamentos();
    let alterou = false;

    const alunosAtualizados = alunos.map((aluno) => {
      const pagamentosAluno = pagamentos.filter(
        (pagamento) => pagamento.alunoId === aluno.id
      );
      const inadimplente = pagamentosAluno.some(
        (pagamento) => this.getStatusPagamento(pagamento) === "vencido"
      );
      const novoStatus =
        aluno.status === "inativo"
          ? "inativo"
          : inadimplente
            ? "inadimplente"
            : "ativo";

      if (aluno.status !== novoStatus) {
        alterou = true;
        return { ...aluno, status: novoStatus };
      }

      return aluno;
    });

    if (alterou) {
      this.setAlunos(alunosAtualizados);
    }

    return alunosAtualizados;
  },

  escapeHTML(valor) {
    return String(valor ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },
};
