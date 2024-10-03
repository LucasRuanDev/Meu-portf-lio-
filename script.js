document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link

        const targetId = this.getAttribute('href'); // Obtém o ID da seção
        const targetElement = document.querySelector(targetId); // Seleciona a seção alvo

        targetElement.scrollIntoView({
            behavior: 'smooth' // Ativa o scroll suave
        });
    });
});
