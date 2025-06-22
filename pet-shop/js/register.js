// API Base URL (ajusta según tu backend)
const API_BASE = "http://localhost:3000/api";

// Enviar comentario
document.getElementById("RegisterForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const registerData = {
    name: document.getElementById("name").value,
    last: document.getElementById("last").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerDataData),
    });

    if (response.ok) {
      document.getElementById("registerForm").reset();
    } else {
      alert("❌ Error al enviar el register");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
