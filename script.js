
let usuario = {
  nombre: "",
  grupo: "",
  correo: ""
};

let quizDisponible = false;

const preguntas = [
  { pregunta: "¿Dónde va una botella de plástico?", correcta: "reciclable" },
  { pregunta: "¿Dónde se desecha una cáscara de plátano?", correcta: "organico" },
  { pregunta: "¿Una envoltura de papas fritas va en…?", correcta: "no_reciclable" },
  { pregunta: "¿Qué tipo de residuo es el cartón?", correcta: "reciclable" },
  { pregunta: "¿Restos de comida van en…?", correcta: "organico" }
];

let preguntaActual = 0;
let puntos = 0;

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="inicio" class="seccion">
      <div class="card">
        <h1>🌱 Proyecto PEC - CBTis 145</h1>
        <p>Bienvenid@ a la capacitación para reducir residuos. Ingresa tus datos:</p>
        <input type="text" id="nombre" placeholder="Nombre completo" /><br><br>
        <input type="text" id="grupo" placeholder="Grupo" /><br><br>
        <input type="email" id="correo" placeholder="Correo institucional" /><br><br>
        <button onclick="validarFormulario()">Iniciar Capacitación</button>
      </div>
    </section>
    <section id="capacitacion" class="seccion" style="display:none;">
      <div class="card">
        <h2>♻️ Capacitación</h2>
        <p>Aquí aprenderás cómo clasificar residuos: orgánicos, reciclables e inorgánicos no reciclables.</p>
        <ul>
          <li><strong>Orgánicos:</strong> restos de comida, cáscaras.</li>
          <li><strong>Inorgánicos reciclables:</strong> botellas, papel, cartón.</li>
          <li><strong>Inorgánicos no reciclables:</strong> envolturas, unicel.</li>
        </ul>
        <button onclick="irAlQuiz()">📘 He leído todo, ir al Quiz</button>
      </div>
    </section>
    <section id="organizacion" class="seccion" style="display:none;">
      <div class="card">
        <h2>📋 Organización</h2>
        <p>Actividades, cronograma, costos y variables del proyecto.</p>
      </div>
    </section>
    <section id="quiz" class="seccion" style="display:none;">
      <div class="card" id="contenedorQuiz">
        <h2>🧠 Quiz</h2>
        <p id="textoPregunta">Pregunta aquí</p>
        <button onclick="responder('organico')">🍌 Orgánico</button>
        <button onclick="responder('reciclable')">♻️ Reciclable</button>
        <button onclick="responder('no_reciclable')">🗑️ No reciclable</button>
        <p id="puntaje">⭐ Puntos: 0</p>
      </div>
    </section>
    <section id="prototipo" class="seccion" style="display:none;">
      <div class="card">
        <h2>🛠️ Prototipo</h2>
        <p>Este espacio está reservado para mostrar tu contenedor innovador.</p>
        <div style="height:200px; background:#eee; display:flex; justify-content:center; align-items:center;">
          <em>Espacio reservado para imagen</em>
        </div>
      </div>
    </section>
    <section id="graficas" class="seccion" style="display:none;">
      <div class="card">
        <h2>📊 Gráficas</h2>
        <canvas id="grafica"></canvas>
      </div>
    </section>
  `;

  mostrarPregunta();

  const ctx = document.getElementById('grafica');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Conocimiento antes', 'Conocimiento después', 'Participación'],
        datasets: [{
          label: 'Resultados simulados',
          data: [25, 75, 60],
          backgroundColor: ['#81c784', '#4caf50', '#388e3c']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});

function validarFormulario() {
  const nombre = document.getElementById("nombre").value.trim();
  const grupo = document.getElementById("grupo").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!nombre || !grupo || !correo) {
    alert("Por favor, completa todos los campos antes de continuar.");
    return;
  }

  usuario = { nombre, grupo, correo };
  mostrarSeccion('capacitacion');
}

function mostrarSeccion(id) {
  if (id === 'quiz' && !quizDisponible) {
    alert("Debes completar la capacitación antes de hacer el quiz.");
    return;
  }

  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach(sec => sec.style.display = "none");

  const actual = document.getElementById(id);
  if (actual) {
    actual.style.display = "block";
  }
}

function irAlQuiz() {
  quizDisponible = true;
  mostrarSeccion('quiz');
}

function mostrarPregunta() {
  if (preguntaActual >= preguntas.length) {
    document.getElementById("contenedorQuiz").innerHTML = `
      <h2>🎉 ¡Quiz terminado!</h2>
      <p>${usuario.nombre} (${usuario.grupo})</p>
      <p>Obtuviste ⭐ ${puntos} de ${preguntas.length}</p>
      <button onclick="enviarResultadosPorCorreo()">📩 Enviar resultados al equipo</button>
      <button onclick="desbloquearMenu()">🔓 Ver resultados y continuar</button>
    `;
    return;
  }

  document.getElementById("textoPregunta").innerText = preguntas[preguntaActual].pregunta;
}

function responder(respuesta) {
  if (respuesta === preguntas[preguntaActual].correcta) {
    puntos++;
  }
  preguntaActual++;
  document.getElementById("puntaje").innerText = `⭐ Puntos: ${puntos}`;
  mostrarPregunta();
}

function desbloquearMenu() {
  document.getElementById("menuNav").style.display = "block";
  mostrarSeccion("organizacion");
}

function enviarResultadosPorCorreo() {
  fetch('/.netlify/functions/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: usuario.nombre,
      grupo: usuario.grupo,
      correo: usuario.correo,
      puntaje: puntos,
      total: preguntas.length,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error('Error al enviar el correo:', error);
      alert('Ocurrió un error al enviar los resultados. Intenta más tarde.');
    });
}
