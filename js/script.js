/*
    INtroduccion humano comoputadora
    Unidad ii Factor humano y sus aspectos
    DR. Humberto Marin Vega
*/
const tieneSoporteUserMedia = () => 
    !! (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

const $video = document.querySelector("#video"),
    $canvas = document.querySelector("#canvas"),
    $boton = document.querySelector("#boton"),
    $listaDeDispositivos = document.querySelector("#listaDeDispositivos");

const limpiarSelect = () => {
    for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--)
        $listaDeDispositivos.remove(x);
};
const obtenerDispositivos = () => navigator
    .mediaDevices
    .enumerateDevices();

const llenarSelectConDispositivosDisponibles = () => {

    limpiarSelect();
    obtenerDispositivos()
        .then(dispositivos => {
            const dispositivosDeVideo = [];
            dispositivos.forEach(dispositivo => {
                const tipo = dispositivo.kind;
                if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
            });
            

            if (dispositivosDeVideo.length > 0) {
                dispositivosDeVideo.forEach(dispositivo => {
                    const option = document.createElement('option');
                    option.value = dispositivo.deviceId;
                    option.text = dispositivo.label;
                    $listaDeDispositivos.appendChild(option);
                });
            }
        });
}

(function () {
    if (!tieneSoporteUserMedia()) {
        alert("Lo siento. Tu navegador no soporta esta caracteristica");
        $estado.innerHTML = "Parece que tu navegador no soprta esta caracteristica. Intenta actualizarlo.";
        return;
    }
    let stream;


    obtenerDispositivos()
        .then(dispositivos => {
            const dispositivosDeVideo = [];
            dispositivos.forEach(function(dispositivo) {
                const tipo = dispositivo.kind;
                if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
            });

            if (dispositivosDeVideo.length > 0) {
                mostrarStream(dispositivosDeVideo[0].deviceId);
            }
        });



    const mostrarStream = idDeDispositivo => {
        _getUserMedia({
            video: {
                deviceId: idDeDispositivo,
            }
        },
        (streamObtenido) => {
            llenarSelectConDispositivosDisponibles();

            $listaDeDispositivos.onchange = () => {
                if (stream) {
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                }
                mostrarStream($listaDeDispositivos.value);
            }

            stream = streamObtenido;

            $video.srcObject = stream;
            $video.play();

            $boton.addEventListener("click", function() {

                $video.pause();

                let contexto = $canvas.getContext("2d");
                $canvas.width = $video.videoWidth;
                $canvas.height = $video.videoHeight;
                contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);

                let foto = $canvas.toDataURL(); //esta es la foto en base 64

                let enlace = document.createElement('a'); //crear un <a>
                enlace.download = "foto_parzibyte.me.png";
                enlace.href = foto;
                enlace.click();
                $video.play();
            });

        },(error) => {
            console.log("Permiso denegado o error: ", error);
            $estado.innerHTML = "Nose puede accerder a la camara. o no diste permiso";
        });
    }
})();