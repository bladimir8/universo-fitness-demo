window.ChatIA = (function () {
    const ICONO_BOT = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>';

    function crearSesion({ mensajesEl, formularioEl, entradaEl, conAvatares = false, onPrimerMensaje }) {
        const historialConversacion = [];
        let primerMensajeEnviado = false;

        function crearFila(esUsuario) {
            const fila = document.createElement('div');
            fila.className = 'fila-mensaje-chat ' + (esUsuario ? 'fila-mensaje-usuario' : 'fila-mensaje-bot');
            if (conAvatares && !esUsuario) {
                const avatar = document.createElement('div');
                avatar.className = 'avatar-mensaje-chat';
                avatar.innerHTML = ICONO_BOT;
                fila.appendChild(avatar);
            }
            return fila;
        }

        function agregarMensaje(texto, esUsuario) {
            const fila = crearFila(esUsuario);
            const burbuja = document.createElement('div');
            burbuja.className = 'mensaje-chatbot ' + (esUsuario ? 'mensaje-usuario' : 'mensaje-bot');
            burbuja.style.whiteSpace = 'pre-line';
            burbuja.textContent = texto;
            fila.appendChild(burbuja);
            mensajesEl.appendChild(fila);
            mensajesEl.scrollTop = mensajesEl.scrollHeight;
        }

        function mostrarIndicadorEscribiendo() {
            const fila = crearFila(false);
            const burbuja = document.createElement('div');
            burbuja.className = 'mensaje-chatbot mensaje-bot mensaje-cargando';
            burbuja.innerHTML = '<span class="punto-cargando"></span><span class="punto-cargando"></span><span class="punto-cargando"></span>';
            fila.appendChild(burbuja);
            mensajesEl.appendChild(fila);
            mensajesEl.scrollTop = mensajesEl.scrollHeight;
            return fila;
        }

        async function pedirRespuestaIA(texto) {
            const respuesta = await fetch('/chatbot-api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensaje: texto, historial: historialConversacion }),
            });
            const datos = await respuesta.json();
            if (!datos.ok) return null;
            return datos.texto;
        }

        formularioEl.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const texto = entradaEl.value.trim();
            if (!texto) return;

            if (!primerMensajeEnviado) {
                primerMensajeEnviado = true;
                onPrimerMensaje?.();
            }

            agregarMensaje(texto, true);
            entradaEl.value = '';

            const indicador = mostrarIndicadorEscribiendo();

            pedirRespuestaIA(texto)
                .then((textoIA) => {
                    indicador.remove();
                    if (textoIA) {
                        historialConversacion.push({ rol: 'usuario', texto });
                        historialConversacion.push({ rol: 'asistente', texto: textoIA });
                        agregarMensaje(textoIA, false);
                    } else {
                        agregarMensaje(window.ChatbotConocimiento.buscarRespuesta(texto), false);
                    }
                })
                .catch(() => {
                    indicador.remove();
                    agregarMensaje(window.ChatbotConocimiento.buscarRespuesta(texto), false);
                });
        });

        return { agregarMensaje };
    }

    return { crearSesion };
})();
