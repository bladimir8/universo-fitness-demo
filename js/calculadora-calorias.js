(function () {
    const formulario = document.getElementById('formulario-calculadora');
    if (!formulario) return;

    const resultado = document.getElementById('resultado-calculadora');
    const etiquetasObjetivo = {
        bajar: 'Calorías para bajar de peso',
        mantener: 'Calorías de mantenimiento',
        subir: 'Calorías para ganar músculo',
    };

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const sexo = document.getElementById('sexo').value;
        const edad = parseFloat(document.getElementById('edad').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const estatura = parseFloat(document.getElementById('estatura').value);
        const factorActividad = parseFloat(document.getElementById('actividad').value);
        const objetivo = document.getElementById('objetivo').value;

        if (!edad || !peso || !estatura) return;

        // Fórmula Mifflin-St Jeor (la más precisa validada para población general)
        let bmr = (10 * peso) + (6.25 * estatura) - (5 * edad);
        bmr += sexo === 'hombre' ? 5 : -161;

        const mantenimiento = bmr * factorActividad;

        let objetivoCalorias = mantenimiento;
        if (objetivo === 'bajar') objetivoCalorias = mantenimiento - 500;
        if (objetivo === 'subir') objetivoCalorias = mantenimiento + 350;

        // Límite de seguridad: nunca bajar de un mínimo saludable
        const minimoSeguro = sexo === 'hombre' ? 1500 : 1200;
        if (objetivoCalorias < minimoSeguro) objetivoCalorias = minimoSeguro;

        // Proteína según peso corporal (más preciso que un % fijo para todos)
        const gramosProteinaPorKg = objetivo === 'bajar' ? 2.2 : 1.8;
        const proteinaG = peso * gramosProteinaPorKg;
        const proteinaKcal = proteinaG * 4;

        // Grasas: 25% de las calorías objetivo
        const grasasKcal = objetivoCalorias * 0.25;
        const grasasG = grasasKcal / 9;

        // Carbohidratos: el resto de las calorías
        const carbosKcal = Math.max(objetivoCalorias - proteinaKcal - grasasKcal, 0);
        const carbosG = carbosKcal / 4;

        document.getElementById('resultado-bmr').textContent = Math.round(bmr) + ' kcal';
        document.getElementById('resultado-mantenimiento').textContent = Math.round(mantenimiento) + ' kcal';
        document.getElementById('resultado-objetivo').textContent = Math.round(objetivoCalorias) + ' kcal';
        document.getElementById('etiqueta-objetivo-resultado').textContent = etiquetasObjetivo[objetivo];
        document.getElementById('resultado-proteina').textContent = Math.round(proteinaG) + ' g';
        document.getElementById('resultado-carbohidratos').textContent = Math.round(carbosG) + ' g';
        document.getElementById('resultado-grasas').textContent = Math.round(grasasG) + ' g';

        resultado.hidden = false;
        resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();
