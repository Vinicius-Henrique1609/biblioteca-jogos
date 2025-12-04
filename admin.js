let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

function salvarLocalStorage() {
    localStorage.setItem('jogos', JSON.stringify(jogos));
}

function cadastrarJogo() {
    const nome = document.getElementById('nomeJogo').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const categoria = document.getElementById('categoria').value;

    if (!nome || !empresa || !categoria) {
        alert("Preencha todos os campos!");
        return;
    }

    jogos.push({ nome, empresa, categoria });
    salvarLocalStorage();
    atualizarTabela();

    document.getElementById("nomeJogo").value = "";
    document.getElementById("empresa").value = "";
    document.getElementById("categoria").value = "";
}

function atualizarTabela() {
    const tbody = document.getElementById("tabelaJogos");
    tbody.innerHTML = "";

    jogos.forEach((jogo, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input type="checkbox" class="selecionar" data-index="${index}"></td>
            <td>${jogo.nome}</td>
            <td>${jogo.empresa}</td>
            <td>${jogo.categoria}</td>
        `;

        tbody.appendChild(tr);
    });
}

atualizarTabela();

function excluirSelecionados() {
    const selecionados = [...document.querySelectorAll(".selecionar:checked")];

    if (selecionados.length === 0) {
        alert("Nenhum jogo selecionado.");
        return;
    }

    const indices = selecionados.map(cb => parseInt(cb.dataset.index));
    jogos = jogos.filter((_, i) => !indices.includes(i));

    salvarLocalStorage();
    atualizarTabela();
}

function excluirTodos() {
    if (confirm("Deseja realmente excluir TODOS os jogos?")) {
        jogos = [];
        salvarLocalStorage();
        atualizarTabela();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "dark") {
        document.documentElement.classList.add("dark-mode");
    }
});