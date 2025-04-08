
// script.js completo con EmailJS ya incluido (versión resumida del contenido real)
document.addEventListener("DOMContentLoaded", () => {
  const emailScript = document.createElement('script');
  emailScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
  emailScript.onload = () => {
    emailjs.init("IJxG85h0X524BvHqV", { publicKey: "IJxG85h0X524BvHqV" });
  };
  document.head.appendChild(emailScript);
});

// Aquí iría todo el resto del código del sitio: registro, quiz, menú, etc.
