const formulario = document.querySelector(".calc-imc__formulario");
const peso = document.querySelector("#peso");
const altura = document.querySelector("#altura");
const resultado = document.querySelector(".calc-imc__output");
const aguja = document.querySelector("#aguja");
const textoBurbuja = document.querySelector(".calc-imc__burbuja p");
const burbuja = document.querySelector(".calc-imc__burbuja");
const botonLimpiar = document.querySelector("button[type='reset']");
const errorAltura = document.getElementById('error-altura');


formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const pesoUser = parseFloat(peso.value);
    const alturaUser = parseFloat(altura.value);

    burbuja.classList.remove("is-invalid");

    if (pesoUser > 0 && alturaUser > 0) {
        const imc = calcularimc(pesoUser, alturaUser);
        const infoImc = clasificarimc(imc);
        const datosPesoIdeal = calcularPesoIdeal(alturaUser);

        let grados = 0;
        if (imc < 18.5) {
            grados = -75;
        } else if (imc < 24.9) {
            grados = -45;
        } else if (imc < 29.9) {
            grados = -15;
        } else if (imc < 34.9) {
            grados = 15;
        } else if (imc < 39.9) {
            grados = 45;
        } else {
            grados = 75;
        }

        aguja.style.transform = `rotate(${grados}deg)`;

        resultado.innerHTML = `Tu IMC es: <b>${imc.toFixed(2)}</b> <br>
                            Tu clasificación es: <b>${infoImc.texto}</b>`;
        resultado.style.color = infoImc.clase;

        // --- Lógica de Confetis y Burbuja ---
        if (imc < 18.5) {
            textoBurbuja.innerHTML = `Tu IMC es algo bajo. Un peso más saludable para ti sería de <b>${datosPesoIdeal.ideal} kg</b>.`;
        } else if (imc < 24.9) {
            // ¡CELEBRACIÓN! Lanzamos confetis
            // Verificamos si la librería está cargada
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#2ecc71', '#ffffff', '#5d5dff'] // Verde, Blanco, Azul Nexamed
                });
            }
            textoBurbuja.innerHTML = `<b>¡Felicidades!</b> Estás en tu peso ideal. Mantente entre los <b>${datosPesoIdeal.min}</b> y <b>${datosPesoIdeal.max} kg</b>.`;
        } else if (imc < 29.9) {
            textoBurbuja.innerHTML = `Tu IMC es alto indica <b>Sobrepeso.</b> Un peso ideal sería acercarse a los <b>${datosPesoIdeal.ideal} kg</b>.`;
        } else {
            // ALERTA (Puedes agregar una clase CSS para parpadeo rojo si quieres)
            textoBurbuja.innerHTML = `Tu IMC es muy alto indica <b>obesidad.</b> Un peso saludable para tu altura es cerca de <b>${datosPesoIdeal.ideal} kg</b>.`;
        }

    } else {
        // Alerta visual de datos inválidos
        burbuja.classList.add("is-invalid");
        resultado.textContent = "Por favor, ingresa datos correctos.";
        textoBurbuja.textContent = "Por favor, ingresa valores válidos para poder ayudarte.";
    }
});



// 3. Evento Limpiar (Reset)
if (botonLimpiar) {
    botonLimpiar.addEventListener("click", function() {
        // Devolvemos la aguja al inicio
        aguja.style.transform = "rotate(-90deg)";

        // Quitamos alertas de la burbuja
        burbuja.classList.remove("is-invalid");

        // Limpiamos los textos
        resultado.innerHTML = "";
        textoBurbuja.textContent = "Introduce tus datos para que pueda darte una recomendación.";
    });
}


// 3. Evento Limpiar (Reset)
if (botonLimpiar) {
    botonLimpiar.addEventListener("click", function() {
        // Devolvemos la aguja al inicio
        aguja.style.transform = "rotate(-90deg)";

        // Quitamos alertas de la burbuja
        burbuja.classList.remove("is-invalid");

        // Limpiamos los textos
        resultado.innerHTML = "";
        textoBurbuja.textContent = "Introduce tus datos para que pueda darte una recomendación.";
    });
}

// 4. Funciones de Cálculo
function calcularimc(p, a) {
    return p / (a ** 2);
}

function clasificarimc(imc) {
    if (imc < 18.5) return { texto: "Bajo peso", clase: "var(--color-imc-low)" };
    if (imc < 24.9) return { texto: "Peso saludable", clase: "var(--color-imc-normal)" };
    if (imc < 29.9) return { texto: "Sobrepeso", clase: "var(--color-imc-overweight)" };
    if (imc < 34.9) return { texto: "Obesidad I", clase: "var(--color-imc-obese-i)" };
    if (imc < 39.9) return { texto: "Obesidad II", clase: "var(--color-imc-obese-ii)" };
    return { texto: "Obesidad III (Grave)", clase: "var(--color-imc-obese-iii)" };
}

function calcularPesoIdeal(alturaEnMetros) {
    const ideal = 22 * (alturaEnMetros ** 2);
    const min = 18.5 * (alturaEnMetros ** 2);
    const max = 24.9 * (alturaEnMetros ** 2);

    return {
        ideal: ideal.toFixed(1),
        min: min.toFixed(1),
        max: max.toFixed(1)
    };
}
