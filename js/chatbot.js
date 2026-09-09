(function () {
    const boton = document.getElementById('boton-chatbot');
    const panel = document.getElementById('panel-chatbot');
    const cerrar = document.getElementById('cerrar-chatbot');
    const formulario = document.getElementById('formulario-chatbot');
    const entrada = document.getElementById('entrada-chatbot');
    const mensajes = document.getElementById('mensajes-chatbot');

    if (!boton || !panel || !formulario) return;

    const globo = document.getElementById('globo-saludo-chatbot');
    const cerrarGlobo = document.getElementById('cerrar-globo-chatbot');

    function ocultarGlobo() {
        if (globo) globo.hidden = true;
    }

    boton.addEventListener('click', () => {
        ocultarGlobo();
        panel.hidden = !panel.hidden;
        if (!panel.hidden) entrada.focus();
    });
    cerrar.addEventListener('click', () => { panel.hidden = true; });

    if (globo) {
        globo.addEventListener('click', () => {
            ocultarGlobo();
            panel.hidden = false;
            entrada.focus();
        });
        cerrarGlobo?.addEventListener('click', (evento) => {
            evento.stopPropagation();
            ocultarGlobo();
        });

        try {
            if (!localStorage.getItem('chatbotSaludoMostrado')) {
                setTimeout(() => {
                    globo.hidden = false;
                    localStorage.setItem('chatbotSaludoMostrado', '1');
                }, 1500);
            }
        } catch (e) {
            // almacenamiento no disponible, no pasa nada
        }
    }

    window.ChatIA.crearSesion({ mensajesEl: mensajes, formularioEl: formulario, entradaEl: entrada });
})();
