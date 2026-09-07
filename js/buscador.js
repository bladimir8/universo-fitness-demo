(function () {
    const input = document.getElementById('buscador-productos');
    const selectCategoria = document.getElementById('filtro-categoria');
    const tarjetas = Array.from(document.querySelectorAll('.tarjeta-producto'));

    if (!input && !selectCategoria) return;

    function aplicarFiltros() {
        const texto = (input?.value || '').trim().toLowerCase();
        const categoriaActiva = selectCategoria?.value || '';
        tarjetas.forEach((tarjeta) => {
            const nombre = tarjeta.querySelector('h3')?.textContent.toLowerCase() || '';
            const categoria = tarjeta.dataset.categoria || '';
            const coincideTexto = texto === '' || nombre.includes(texto);
            const coincideCategoria = categoriaActiva === '' || categoria === categoriaActiva;
            tarjeta.hidden = !(coincideTexto && coincideCategoria);
        });
    }

    if (input) input.addEventListener('input', aplicarFiltros);
    if (selectCategoria) selectCategoria.addEventListener('change', aplicarFiltros);
})();
