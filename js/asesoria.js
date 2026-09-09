(function () {
    const contenedor = document.getElementById('pagina-asesoria-ia');
    const formulario = document.getElementById('formulario-asesoria');
    const entrada = document.getElementById('entrada-asesoria');
    const mensajes = document.getElementById('mensajes-asesoria');

    if (!contenedor || !formulario || !entrada || !mensajes) return;

    window.ChatIA.crearSesion({
        mensajesEl: mensajes,
        formularioEl: formulario,
        entradaEl: entrada,
        conAvatares: false,
        onPrimerMensaje: () => contenedor.classList.add('con-mensajes'),
    });
})();
