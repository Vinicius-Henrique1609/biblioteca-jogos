let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

function salvarLocalStorage() {
    localStorage.setItem('jogos', JSON.stringify(jogos));
}

function atualizarTabela(lista = jogos) {
    const tbody = document.getElementById('tabelaJogos');
    tbody.innerHTML = '';

    lista.forEach(jogo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${jogo.nome}</td>
            <td>${jogo.empresa}</td>
            <td>${jogo.categoria}</td>
        `;
        tbody.appendChild(tr);
    });
}

function pesquisarJogo() {
    const termo = document.getElementById('pesquisaInput').value.toLowerCase();
    const filtrados = jogos.filter(j =>
        j.nome.toLowerCase().includes(termo) ||
        j.empresa.toLowerCase().includes(termo) ||
        j.categoria.toLowerCase().includes(termo)
    );

    atualizarTabela(filtrados);
}

function filtrarCategoria() {
    const categoria = document.getElementById('filtroCategoria').value;

    if (!categoria) {
        atualizarTabela();
        return;
    }

    const filtrados = jogos.filter(j => j.categoria === categoria);
    atualizarTabela(filtrados);
}

const btnAcessibilidade = document.getElementById("btnAcessibilidade");
const iconeModo = document.getElementById("iconeModo");

btnAcessibilidade.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    const dark = document.documentElement.classList.contains("dark-mode");
    iconeModo.textContent = dark ? "light_mode" : "dark_mode";

    localStorage.setItem("tema", dark ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
    const tema = localStorage.getItem("tema");

    if (tema === "dark") {
        document.documentElement.classList.add("dark-mode");
        iconeModo.textContent = "light_mode";
    } else {
        iconeModo.textContent = "dark_mode";
    }

    atualizarTabela();
});
window.addEventListener("storage", event => {
    if (event.key === "jogos") {
        location.reload();
    }
});