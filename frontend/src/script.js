
// Adicione um ouvinte de evento para cada grupo de botões
document.querySelectorAll(".btn-group").forEach(function (group) {
    group.addEventListener("click", function (e) {
        if (e.target && e.target.tagName === "BUTTON") {
            // Desmarque todos os botões no grupo
            const buttons = group.querySelectorAll("button");
            buttons.forEach(function (button) {
                button.classList.remove("active");
            });
            // Marque o botão clicado
            e.target.classList.add("active");
        }
    });
});
