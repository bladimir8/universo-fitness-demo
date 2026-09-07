(function () {
    let items = [];
    let index = 0;
    let temporizador = null;

    const capaImagen = document.getElementById('capa-imagen');
    const capaVideo = document.getElementById('capa-video');
    const aviso = document.getElementById('aviso-vacio');

    async function cargarPlaylist() {
        try {
            const res = await fetch(`/pantalla-datos.php?id=${window.PANTALLA_ID}&_=${Date.now()}`);
            const datos = await res.json();
            items = datos.items || [];
            if (index >= items.length) index = 0;
        } catch (e) {
            items = [];
        }
    }

    function siguiente() {
        if (items.length === 0) {
            mostrarActual();
            return;
        }
        index = (index + 1) % items.length;
        if (index === 0) {
            cargarPlaylist().then(mostrarActual);
        } else {
            mostrarActual();
        }
    }

    function mostrarActual() {
        clearTimeout(temporizador);

        if (items.length === 0) {
            capaImagen.style.opacity = 0;
            capaVideo.style.opacity = 0;
            aviso.hidden = false;
            temporizador = setTimeout(() => cargarPlaylist().then(mostrarActual), 5000);
            return;
        }

        aviso.hidden = true;
        const item = items[index];

        if (item.tipo === 'imagen') {
            capaVideo.pause();
            capaVideo.style.opacity = 0;
            capaImagen.style.backgroundImage = `url('${item.url}')`;
            capaImagen.style.opacity = 1;
            temporizador = setTimeout(siguiente, (item.duracion || 8) * 1000);
        } else {
            capaImagen.style.opacity = 0;
            capaVideo.style.opacity = 1;
            if (capaVideo.getAttribute('src') !== item.url) {
                capaVideo.src = item.url;
            }
            capaVideo.currentTime = 0;
            capaVideo.play().catch(siguiente);
        }
    }

    capaVideo.addEventListener('ended', siguiente);
    capaVideo.addEventListener('error', () => setTimeout(siguiente, 1000));

    cargarPlaylist().then(mostrarActual);
    setInterval(cargarPlaylist, 120000);

    const botonPantallaCompleta = document.getElementById('boton-pantalla-completa');
    botonPantallaCompleta.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen();
        }
    });
    document.addEventListener('fullscreenchange', () => {
        botonPantallaCompleta.hidden = !!document.fullscreenElement;
    });
})();
