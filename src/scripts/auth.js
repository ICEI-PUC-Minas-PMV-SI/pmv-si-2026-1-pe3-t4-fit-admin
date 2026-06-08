class Auth {
  static criarConta(userData) {
    try {
      if (!userData || !userData.email) {
        console.error("Dados do usuário inválidos:", userData);
        return false;
      }

      const usuarios = this.getUsuarios();
      console.log("Usuários existentes:", usuarios);
      console.log("Tentando criar conta com email:", userData.email);

      const emailExiste = usuarios.some(
        (user) =>
          user &&
          user.email &&
          user.email.toLowerCase() === userData.email.toLowerCase()
      );
      console.log("Email já existe?", emailExiste);

      if (emailExiste) {
        return false;
      }

      usuarios.push({
        ...userData,
        alunos: [],
        funcionarios: [],
        pagamentos: [],
        treinos: [],
        tipo: "admin"
      });

      console.log("Novo usuário adicionado:", usuarios[usuarios.length - 1]);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return true;
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return false;
    }
  }

  static login(email, senha) {
    try {
      if (!email || !senha) {
        console.error("Email ou senha não fornecidos");
        return null;
      }

      const usuarios = this.getUsuarios();
      console.log("Tentando login com email:", email);
      console.log("Usuários disponíveis:", usuarios);

      const funcionario = usuarios.find(
        (user) =>
          user &&
          user.funcionarios &&
          user.funcionarios.some(
            (f) =>
              f.email.toLowerCase() === email.toLowerCase() &&
              f.senha === senha
          )
      );

      if (funcionario) {
        const funcionarioEncontrado = funcionario.funcionarios.find(
          (f) => f.email.toLowerCase() === email.toLowerCase()
        );
        console.log("Login bem sucedido para funcionário:", funcionarioEncontrado.email);
        localStorage.setItem("usuarioAtual", JSON.stringify({
          ...funcionarioEncontrado,
          empresa: funcionario.empresa
        }));
        return funcionarioEncontrado;
      }

      const admin = usuarios.find(
        (user) =>
          user &&
          user.email &&
          user.email.toLowerCase() === email.toLowerCase() &&
          user.senha === senha
      );

      if (admin) {
        console.log("Login bem sucedido para admin:", admin.email);
        localStorage.setItem("usuarioAtual", JSON.stringify(admin));
        return admin;
      }

      console.log("Login falhou - usuário não encontrado ou senha incorreta");
      return null;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return null;
    }
  }

  static getUsuarioAtual() {
    try {
      const usuario = localStorage.getItem("usuarioAtual");
      return usuario ? JSON.parse(usuario) : null;
    } catch (error) {
      console.error("Erro ao obter usuário atual:", error);
      return null;
    }
  }

  static logout() {
    try {
      localStorage.removeItem("usuarioAtual");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  static alterarSenha(senhaAtual, novaSenha) {
    try {
      const usuarioAtual = this.getUsuarioAtual();
      if (!usuarioAtual || !senhaAtual || !novaSenha) {
        return { ok: false, mensagem: "Informe a senha atual e a nova senha." };
      }

      const usuarios = this.getUsuarios();

      if (usuarioAtual.tipo === "funcionario") {
        const admin = usuarios.find(
          (user) =>
            user.funcionarios &&
            user.funcionarios.some(
              (funcionario) =>
                funcionario.email.toLowerCase() ===
                usuarioAtual.email.toLowerCase()
            )
        );

        const funcionario = admin?.funcionarios.find(
          (item) =>
            item.email.toLowerCase() === usuarioAtual.email.toLowerCase()
        );

        if (!funcionario || funcionario.senha !== senhaAtual) {
          return { ok: false, mensagem: "Senha atual incorreta." };
        }

        funcionario.senha = novaSenha;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem(
          "usuarioAtual",
          JSON.stringify({ ...funcionario, empresa: admin.empresa })
        );
        return { ok: true, mensagem: "Senha alterada com sucesso." };
      }

      const admin = usuarios.find(
        (user) =>
          user.email &&
          user.email.toLowerCase() === usuarioAtual.email.toLowerCase()
      );

      if (!admin || admin.senha !== senhaAtual) {
        return { ok: false, mensagem: "Senha atual incorreta." };
      }

      admin.senha = novaSenha;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioAtual", JSON.stringify(admin));
      return { ok: true, mensagem: "Senha alterada com sucesso." };
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      return { ok: false, mensagem: "Erro ao alterar senha." };
    }
  }

  static getUsuarios() {
    try {
      const usuarios = localStorage.getItem("usuarios");
      const parsed = usuarios ? JSON.parse(usuarios) : [];
      console.log("Usuários obtidos do localStorage:", parsed);
      return parsed;
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      return [];
    }
  }

  static atualizarUsuarioAtual(novosDados) {
    try {
      if (!novosDados) {
        console.error("Novos dados não fornecidos");
        return;
      }

      const usuarios = this.getUsuarios();
      const usuarioAtual = this.getUsuarioAtual();

      if (!usuarioAtual || !usuarioAtual.email) {
        console.error("Usuário atual inválido");
        return;
      }

      if (usuarioAtual.tipo === "funcionario") {
        const admin = usuarios.find(
          (user) =>
            user &&
            user.funcionarios &&
            user.funcionarios.some(
              (f) => f.email.toLowerCase() === usuarioAtual.email.toLowerCase()
            )
        );

        if (admin) {
          const funcionarioIndex = admin.funcionarios.findIndex(
            (f) => f.email.toLowerCase() === usuarioAtual.email.toLowerCase()
          );

          if (funcionarioIndex !== -1) {
            admin.funcionarios[funcionarioIndex] = { ...admin.funcionarios[funcionarioIndex], ...novosDados };
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioAtual", JSON.stringify(admin.funcionarios[funcionarioIndex]));
          }
        }
      } else {
        const index = usuarios.findIndex(
          (user) =>
            user &&
            user.email &&
            user.email.toLowerCase() === usuarioAtual.email.toLowerCase()
        );

        if (index !== -1) {
          usuarios[index] = { ...usuarios[index], ...novosDados };
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          localStorage.setItem("usuarioAtual", JSON.stringify(usuarios[index]));
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  static _limparDados() {
    try {
      localStorage.removeItem("usuarios");
      localStorage.removeItem("usuarioAtual");
      console.log("Dados do localStorage limpos com sucesso");
    } catch (error) {
      console.error("Erro ao limpar dados:", error);
    }
  }
}
