window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "dark") {
        document.documentElement.classList.add("dark-mode");
    }
});

function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "123") {
        localStorage.setItem("adm_logado", "true");
        window.location.href = "admin.html";
    } else {
        alert("Usuário ou senha inválidos!");
    }
}