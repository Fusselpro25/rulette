// Variables globales
const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;
const radio = canvas.width / 2 - 10;

const opciones = ["Beso", "1$", "Abrazo", "Cachetada", "Caricia", "Regalo", "Piropo", "Chiste"];
const colores = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40","#8BC34A","#E91E63"];

let angulo = 0;
let velocidad = 0;
let girando = false;
let sonidoActivo = true;

// Elementos DOM
const btnGirar = document.getElementById("girar");
const resultadoElem = document.getElementById("resultado");
const sonidoCheck = document.getElementById("sonidoCheck");

// Control de sonido
sonidoCheck.addEventListener('change', function() {
    sonidoActivo = this.checked;
});

// Efectos de sonido usando archivos de audio
const sonidoGiro = new Audio("audio/spin.wav");
const sonidoResultado = new Audio("audio/win.wav");

function playSonidoGiro() {
    if (sonidoActivo) {
        sonidoGiro.currentTime = 0;
        sonidoGiro.play();
    }
}

function playSonidoResultado() {
    if (sonidoActivo) {
        sonidoResultado.currentTime = 0;
        sonidoResultado.play();
    }
}

// Dibujar la ruleta
function dibujarRuleta() {
    const numOpciones = opciones.length;
    const anguloPorSegmento = (2 * Math.PI) / numOpciones;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numOpciones; i++) {
        const inicio = angulo + i * anguloPorSegmento;
        const fin = inicio + anguloPorSegmento;

        const grad = ctx.createRadialGradient(centroX, centroY, radio * 0.3, centroX, centroY, radio);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(1, colores[i % colores.length]);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, inicio, fin);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(centroX, centroY);
        ctx.rotate(inicio + anguloPorSegmento / 2);
        ctx.fillStyle = "#000";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "right";
        ctx.fillText(opciones[i], radio - 15, 5);
        ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(centroX, centroY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff5722";
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Animación de giro
function animar() {
    if (velocidad > 0.001) {
        angulo += velocidad;
        velocidad *= 0.98;
        dibujarRuleta();
        requestAnimationFrame(animar);
    } else if (girando) {
        girando = false;
        mostrarResultado();
    }
}

// Mostrar resultado
function mostrarResultado() {
    const numOpciones = opciones.length;
    const anguloPorSegmento = (2 * Math.PI) / numOpciones;
    
    let anguloNormalizado = (2 * Math.PI - (angulo % (2 * Math.PI))) % (2 * Math.PI);
    let indice = Math.floor(anguloNormalizado / anguloPorSegmento);
    indice = (numOpciones - indice) % numOpciones;
    
    resultadoElem.textContent = "Girando...";
    
    setTimeout(() => {
        resultadoElem.textContent = "Resultado: " + opciones[indice];
        resultadoElem.style.animation = "none";
        setTimeout(() => {
            resultadoElem.style.animation = "pulse 0.5s";
        }, 10);
        playSonidoResultado();
    }, 500);
    
    btnGirar.disabled = false;
}

// Evento para girar la ruleta
btnGirar.addEventListener("click", () => {
    if (!girando) {
        girando = true;
        btnGirar.disabled = true;
        resultadoElem.textContent = "";
        velocidad = Math.random() * 0.2 + 0.2;
        playSonidoGiro();
        animar();
    }
});

// Inicializar ruleta
dibujarRuleta();
