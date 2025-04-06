const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { nombre, grupo, correo, puntaje, total } = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "Equipo_10P",
        template_id: "template_zo2xh8b",
        user_id: "IJxG85h0X524BvHqV",
        template_params: {
          nombre,
          grupo,
          correo,
          puntaje,
          total,
        },
      }),
    });

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "✅ Resultados enviados correctamente al equipo." }),
      };
    } else {
      const text = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "❌ Error al enviar el correo", details: text }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Error en el servidor", error: error.message }),
    };
  }
};