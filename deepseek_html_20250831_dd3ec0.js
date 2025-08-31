var html =  '<!DOCTYPE html>'+
'<html lang="es">'+
'<head>'+
'    <meta charset="UTF-8">'+
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">'+
'    <title>Ruleta Interactiva Mejorada</title>'+
'    <style>'+
'        * {'+
'            box-sizing: border-box;'+
'            margin: 0;'+
'            padding: 0;'+
'        }'+
'        '+
'        body {'+
'            font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;'+
'            text-align: center;'+
'            padding: 15px;'+
'            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);'+
'            min-height: 100vh;'+
'            display: flex;'+
'            flex-direction: column;'+
'            align-items: center;'+
'            justify-content: center;'+
'            color: #fff;'+
'        }'+
'        '+
'        .container {'+
'            width: 100%;'+
'            max-width: 500px;'+
'            display: flex;'+
'            flex-direction: column;'+
'            align-items: center;'+
'            padding: 20px;'+
'            background: rgba(255, 255, 255, 0.1);'+
'            backdrop-filter: blur(10px);'+
'            border-radius: 20px;'+
'            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);'+
'        }'+
'        '+
'        h1 {'+
'            margin-bottom: 20px;'+
'            font-size: 2.2rem;'+
'            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);'+
'        }'+
'        '+
'        .ruleta-container {'+
'            position: relative;'+
'            width: 100%;'+
'            margin: 20px 0;'+
'        }'+
'        '+
'        canvas {'+
'            display: block;'+
'            width: 100%;'+
'            max-width: 400px;'+
'            height: auto;'+
'            margin: 0 auto;'+
'            border-radius: 50%;'+
'            background-color: #fff;'+
'            box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);'+
'        }'+
'        '+
'        .flecha {'+
'            position: absolute;'+
'            top: -15px;'+
'            left: 50%;'+
'            transform: translateX(-50%);'+
'            width: 0;'+
'            height: 0;'+
'            border-left: 20px solid transparent;'+
'            border-right: 20px solid transparent;'+
'            border-top: 30px solid #ff5722;'+
'            z-index: 10;'+
'            filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.3));'+
'        }'+
'        '+
'        .controles {'+
'            display: flex;'+
'            flex-direction: column;'+
'            align-items: center;'+
'            width: 100%;'+
'            margin-top: 20px;'+
'        }'+
'        '+
'        button {'+
'            padding: 15px 30px;'+
'            font-size: 1.2rem;'+
'            cursor: pointer;'+
'            margin-top: 15px;'+
'            background-color: #ff5722;'+
'            color: white;'+
'            border: none;'+
'            border-radius: 50px;'+
'            transition: all 0.3s;'+
'            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);'+
'            font-weight: bold;'+
'            width: 100%;'+
'            max-width: 250px;'+
'        }'+
'        '+
'        button:hover {'+
'            background-color: #e64a19;'+
'            transform: translateY(-3px);'+
'            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);'+
'        }'+
'        '+
'        button:active {'+
'            transform: translateY(1px);'+
'        }'+
'        '+
'        button:disabled {'+
'            background-color: #cccccc;'+
'            cursor: not-allowed;'+
'            transform: none;'+
'            box-shadow: none;'+
'        }'+
'        '+
'        #resultado {'+
'            margin-top: 25px;'+
'            font-size: 1.5rem;'+
'            font-weight: bold;'+
'            color: #fff;'+
'            min-height: 40px;'+
'            padding: 10px 20px;'+
'            background: rgba(255, 255, 255, 0.15);'+
'            border-radius: 10px;'+
'            width: 100%;'+
'            max-width: 300px;'+
'            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);'+
'        }'+
'        '+
'        .sonido-control {'+
'            margin-top: 20px;'+
'            display: flex;'+
'            align-items: center;'+
'            color: #fff;'+
'            font-size: 1rem;'+
'        }'+
'        '+
'        @media (max-width: 480px) {'+
'            h1 {'+
'                font-size: 1.8rem;'+
'            }'+
'            '+
'            button {'+
'                padding: 12px 25px;'+
'                font-size: 1.1rem;'+
'            }'+
'            '+
'            #resultado {'+
'                font-size: 1.3rem;'+
'            }'+
'            '+
'            .container {'+
'                padding: 15px;'+
'            }'+
'        }'+
'    </style>'+
'</head>'+
'<body>'+
'    <div class="container">'+
'        <h1>Ruleta Interactiva</h1>'+
'        '+
'        <div class="ruleta-container">'+
'            <div class="flecha"></div>'+
'            <canvas id="ruleta" width="400" height="400"></canvas>'+
'        </div>'+
'        '+
'        <div class="controles">'+
'            <button id="girar">Girar Ruleta</button>'+
'            <div id="resultado"></div>'+
'        </div>'+
'        '+
'        <div class="sonido-control">'+
'            <input type="checkbox" id="sonidoCheck" checked>'+
'            <label for="sonidoCheck">Activar sonidos</label>'+
'        </div>'+
'    </div>'+
''+
'    <script>'+
'        // Variables globales'+
'        const canvas = document.getElementById(\'ruleta\');'+
'        const ctx = canvas.getContext(\'2d\');'+
'        const centroX = canvas.width / 2;'+
'        const centroY = canvas.height / 2;'+
'        const radio = canvas.width / 2 - 10;'+
''+
'        const opciones = ["Beso", "1$", "Abrazo", "Cachetada", "Caricia", "Regalo", "Piropo", "Chiste"];'+
'        const colores = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40","#8BC34A","#E91E63"];'+
''+
'        let angulo = 0;'+
'        let velocidad = 0;'+
'        let girando = false;'+
'        let sonidoActivo = true;'+
''+
'        // Elementos DOM'+
'        const btnGirar = document.getElementById("girar");'+
'        const resultadoElem = document.getElementById("resultado");'+
'        const sonidoCheck = document.getElementById("sonidoCheck");'+
''+
'        // Control de sonido'+
'        sonidoCheck.addEventListener(\'change\', function() {'+
'            sonidoActivo = this.checked;'+
'        });'+
''+
'        // Efectos de sonido (simulados con AudioContext)'+
'        function playSonidoGiro() {'+
'            if (!sonidoActivo) return;'+
'            '+
'            try {'+
'                const audioContext = new (window.AudioContext || window.webkitAudioContext)();'+
'                const oscillator = audioContext.createOscillator();'+
'                const gainNode = audioContext.createGain();'+
'                '+
'                oscillator.type = \'sawtooth\';'+
'                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);'+
'                oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 2);'+
'                '+
'                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);'+
'                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);'+
'                '+
'                oscillator.connect(gainNode);'+
'                gainNode.connect(audioContext.destination);'+
'                '+
'                oscillator.start();'+
'                oscillator.stop(audioContext.currentTime + 2);'+
'            } catch (e) {'+
'                console.log("Error de audio:", e);'+
'            }'+
'        }'+
''+
'        function playSonidoResultado() {'+
'            if (!sonidoActivo) return;'+
'            '+
'            try {'+
'                const audioContext = new (window.AudioContext || window.webkitAudioContext)();'+
'                const oscillator = audioContext.createOscillator();'+
'                const gainNode = audioContext.createGain();'+
'                '+
'                oscillator.type = \'sine\';'+
'                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Nota Do'+
'                '+
'                gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);'+
'                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);'+
'                '+
'                oscillator.connect(gainNode);'+
'                gainNode.connect(audioContext.destination);'+
'                '+
'                oscillator.start();'+
'                oscillator.stop(audioContext.currentTime + 0.5);'+
'            } catch (e) {'+
'                console.log("Error de audio:", e);'+
'            }'+
'        }'+
''+
'        // Dibujar la ruleta'+
'        function dibujarRuleta() {'+
'            const numOpciones = opciones.length;'+
'            const anguloPorSegmento = (2 * Math.PI) / numOpciones;'+
''+
'            ctx.clearRect(0, 0, canvas.width, canvas.height);'+
''+
'            for (let i = 0; i < numOpciones; i++) {'+
'                const inicio = angulo + i * anguloPorSegmento;'+
'                const fin = inicio + anguloPorSegmento;'+
''+
'                // Crear gradiente para cada segmento'+
'                const grad = ctx.createRadialGradient(centroX, centroY, radio * 0.3, centroX, centroY, radio);'+
'                grad.addColorStop(0, \'#fff\');'+
'                grad.addColorStop(1, colores[i % colores.length]);'+
'                ctx.fillStyle = grad;'+
''+
'                // Dibujar segmento'+
'                ctx.beginPath();'+
'                ctx.moveTo(centroX, centroY);'+
'                ctx.arc(centroX, centroY, radio, inicio, fin);'+
'                ctx.closePath();'+
'                ctx.fill();'+
'                ctx.strokeStyle = \'white\';'+
'                ctx.lineWidth = 2;'+
'                ctx.stroke();'+
''+
'                // Dibujar texto'+
'                ctx.save();'+
'                ctx.translate(centroX, centroY);'+
'                ctx.rotate(inicio + anguloPorSegmento / 2);'+
'                ctx.fillStyle = "#000";'+
'                ctx.font = "bold 16px Arial";'+
'                ctx.textAlign = "right";'+
'                ctx.fillText(opciones[i], radio - 15, 5);'+
'                ctx.restore();'+
'            }'+
''+
'            // Dibujar centro de la ruleta'+
'            ctx.beginPath();'+
'            ctx.arc(centroX, centroY, 15, 0, 2 * Math.PI);'+
'            ctx.fillStyle = "#ff5722";'+
'            ctx.fill();'+
'            ctx.strokeStyle = \'white\';'+
'            ctx.lineWidth = 3;'+
'            ctx.stroke();'+
'        }'+
''+
'        // Animación de giro'+
'        function animar() {'+
'            if (velocidad > 0.001) {'+
'                angulo += velocidad;'+
'                velocidad *= 0.98; // Reducir velocidad gradualmente'+
'                dibujarRuleta();'+
'                requestAnimationFrame(animar);'+
'            } else if (girando) {'+
'                girando = false;'+
'                mostrarResultado();'+
'            }'+
'        }'+
''+
'        // Mostrar resultado'+
'        function mostrarResultado() {'+
'            const numOpciones = opciones.length;'+
'            const anguloPorSegmento = (2 * Math.PI) / numOpciones;'+
'            '+
'            // Calcular el ángulo normalizado (entre 0 y 2π)'+
'            let anguloNormalizado = (2 * Math.PI - (angulo % (2 * Math.PI))) % (2 * Math.PI);'+
'            '+
'            // Calcular el índice basado en el ángulo (considerando que la flecha está en la parte superior)'+
'            let indice = Math.floor(anguloNormalizado / anguloPorSegmento);'+
'            indice = (numOpciones - indice) % numOpciones;'+
'            '+
'            // Mostrar resultado con animación'+
'            resultadoElem.textContent = "Girando...";'+
'            '+
'            setTimeout(() => {'+
'                resultadoElem.textContent = "Resultado: " + opciones[indice];'+
'                resultadoElem.style.animation = "none";'+
'                setTimeout(() => {'+
'                    resultadoElem.style.animation = "pulse 0.5s";'+
'                }, 10);'+
'                playSonidoResultado();'+
'            }, 500);'+
'            '+
'            // Habilitar el botón nuevamente'+
'            btnGirar.disabled = false;'+
'        }'+
''+
'        // Evento para girar la ruleta'+
'        btnGirar.addEventListener("click", () => {'+
'            if (!girando) {'+
'                girando = true;'+
'                btnGirar.disabled = true;'+
'                resultadoElem.textContent = "";'+
'                velocidad = Math.random() * 0.2 + 0.2; // Velocidad aleatoria'+
'                playSonidoGiro();'+
'                animar();'+
'            }'+
'        });'+
''+
'        // Inicializar ruleta'+
'        dibujarRuleta();'+
''+
'        // Añadir animación CSS para el resultado'+
'        const style = document.createElement(\'style\');'+
'        style.textContent = `'+
'            @keyframes pulse {'+
'                0% { transform: scale(1); }'+
'                50% { transform: scale(1.1); }'+
'                100% { transform: scale(1); }'+
'            }'+
'            #resultado {'+
'                transition: all 0.3s;'+
'            }'+
'        `;'+
'        document.head.appendChild(style);'+
'    </script>'+
'</body>'+
'</html>';
