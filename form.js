const form = document.getElementById("meuForm");
const statusMsg = document.getElementById("mensagem-status");
const telefone = document.getElementById('telefone');
const nomeInput = document.querySelector('input[name="nome"]');
const keys = document.querySelectorAll('.key');
const tooltip = document.getElementById('tooltip');


// --- Máscara de telefone ---
telefone.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Parênteses no DDD
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');     // Hífen antes dos 4 últimos números

    e.target.value = valor;
});

// --- Capitalização do nome ---
nomeInput.addEventListener('input', function(e) {
    let valor = e.target.value;

    valor = valor.split(' ').map(palavra => {
        if(palavra.length === 0) return '';
        return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
    }).join(' ');

    e.target.value = valor;
});

// --- Envio do formulário ---
form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita redirecionar para o Formspree

    const data = new FormData(form);
    const action = form.action;

    try {
        let response = await fetch(action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            statusMsg.style.color = "limegreen";
            statusMsg.innerText = "✅ Mensagem enviada com sucesso!";
            form.reset();
        } else {
            statusMsg.style.color = "red";
            statusMsg.innerText = "❌ Erro ao enviar. Tente novamente.";
        }
    } catch (error) {
        statusMsg.style.color = "red";
        statusMsg.innerText = "⚠️ Falha na conexão. Verifique sua internet.";
    }

    // --- skills ---

    keys.forEach(key => {
  key.addEventListener('mouseenter', e => {
    tooltip.textContent = key.getAttribute('data-info');
    tooltip.style.display = 'block';
  });

  key.addEventListener('mousemove', e => {
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
  });

  key.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});
});
