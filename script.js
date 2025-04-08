// (Versión resumida del código funcional anterior con EmailJS desde navegador)
document.addEventListener("DOMContentLoaded", () => {
  const emailScript = document.createElement('script');
  emailScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
  emailScript.onload = () => {
    emailjs.init("IJxG85h0X524BvHqV", { publicKey: "IJxG85h0X524BvHqV" });
  };
  document.head.appendChild(emailScript);
});