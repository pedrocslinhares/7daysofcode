let people = []; // Array para armazenar as pessoas cadastradas

// Função para adicionar uma pessoa ao array e atualizar a tabela
function adicionarPessoa() {
  const nome = document.getElementById("name").value;
  const dataNascimento = document.getElementById("birth-date").value;

  const pessoa = {
    nome,
    dataNascimento,
  };

  people.push(pessoa);
  atualizarTabela();
  limparCampos();
}

// Função para exibir as pessoas na tabela
function exibirPessoas() {
  const tabela = document.getElementById("people-table-body");
  tabela.innerHTML = "";

  people.forEach((pessoa) => {
    const newRow = tabela.insertRow();
    const cellNome = newRow.insertCell(0);
    const cellDataNascimento = newRow.insertCell(1);

    cellNome.innerHTML = pessoa.nome;
    cellDataNascimento.innerHTML = pessoa.dataNascimento;
  });
}

// Função para limpar os campos do formulário após adicionar uma pessoa
function limparCampos() {
  document.getElementById("name").value = "";
  document.getElementById("birth-date").value = "";
}

// Função para encontrar índice de uma pessoa no array pelo nome
function encontrarIndicePessoa(nome) {
  return people.findIndex((pessoa) => pessoa.nome === nome);
}

// Função para editar uma pessoa da lista
function editarPessoa(nomeAntigo, nomeNovo, dataNascimentoNova) {
  const index = encontrarIndicePessoa(nomeAntigo);

  if (index !== -1) {
    people[index].nome = nomeNovo;
    people[index].dataNascimento = dataNascimentoNova;
    atualizarTabela();
  }
}

// Função para excluir uma pessoa da lista
function excluirPessoa(nome) {
  const index = encontrarIndicePessoa(nome);

  if (index !== -1) {
    people.splice(index, 1);
    atualizarTabela();
  }
}

// Agora, vamos adicionar botões na tabela para editar e excluir pessoas
function criarBotoesEditarExcluir() {
  const tabela = document.getElementById("people-table-body");

  people.forEach((pessoa, index) => {
    const newRow = tabela.rows[index];
    const cellEditar = newRow.insertCell(2);
    const cellExcluir = newRow.insertCell(3);

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "editar";
    btnEditar.addEventListener("click", () => {
      const novoNome = prompt("Digite o novo nome:", pessoa.nome);
      const novaDataNascimento = prompt(
        "Digite a nova data de nascimento:",
        pessoa.dataNascimento
      );

      if (novoNome !== null && novaDataNascimento !== null) {
        editarPessoa(pessoa.nome, novoNome, novaDataNascimento);
      }
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "excluir";
    btnExcluir.addEventListener("click", () => {
      const confirmacao = confirm(
        `Tem certeza que deseja excluir ${pessoa.nome}?`
      );

      if (confirmacao) {
        excluirPessoa(pessoa.nome);
      }
    });

    cellEditar.appendChild(btnEditar);
    cellExcluir.appendChild(btnExcluir);
  });
}

// Atualizar a exibição da tabela após cada ação (adicionar, editar, excluir)
function atualizarTabela() {
  exibirPessoas();
  criarBotoesEditarExcluir();
}

// Função para formatar a data conforme é digitada
function formatarData(input) {
  input.value = input.value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
}

// Função para validar o formato da data
function validarForm() {
  const inputData = document.getElementById("birth-date").value;
  const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!regexData.test(inputData)) {
    alert("Formato de data inválido! Use DD/MM/AAAA.");
    return false;
  }

  // Continuar com o processamento do formulário se a data estiver válida
  return true;
}

// Modificar a chamada para adicionarPessoa() dentro do evento de submit para incluir a atualização da tabela
document.querySelector(".js-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  if (validarForm()) {
    adicionarPessoa();
  }
});

// Inicializar a tabela com dados existentes (se houver)
atualizarTabela();
