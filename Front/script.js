document.addEventListener("DOMContentLoaded", async () => {
    const gridMedicos = document.getElementById("doctors-grid");

    try {
        // Faz a requisição do JSON de forma assíncrona e moderna
        const response = await fetch("medicos.json");
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar os dados: ${response.status}`);
        }

        const medicos = await response.json();

        // Limpa o conteúdo estático inicial da grid
        gridMedicos.innerHTML = "";

        // Percorre cada médico aplicando desestruturação nas propriedades
        medicos.forEach(({ nome, especialidade, convenio, foto }) => {
            const card = document.createElement("div");
            card.classList.add("doctor-card");

            // Template literal limpo e organizado
            card.innerHTML = `
                <img src="${foto}" alt="Foto de ${nome}" loading="lazy">
                <h3>${nome}</h3>
                <span class="spec-tag">${especialidade}</span>
                <p class="convenio">Convênios: ${convenio}</p>
            `;

            // Adiciona o card renderizado na tela
            gridMedicos.appendChild(card);
        });

    } catch (error) {
        console.error("Falha ao carregar o corpo clínico:", error);
        gridMedicos.innerHTML = `
            <p class="error-msg">Não foi possível carregar o corpo clínico no momento. Tente novamente mais tarde.</p>
        `;
    }
});