// API Base URL (ajusta según tu backend)
const API_BASE = "http://localhost:3000/api";

// Enviar comentario
document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener datos del visitante
  const visitorData = await getVisitorData();

  const commentData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    ip_address: visitorData.ip,
    country: visitorData.country_name,
  };

  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      alert("✅ Comentario enviado. Revisa tu email (" + commentData.email + ")");
      document.getElementById("commentForm").reset();
    } else {
      alert("❌ Error al enviar el comentario");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Cargar comentarios al iniciar (opcional)
async function loadComments() {
  try {
    const response = await fetch(`${API_BASE}/contacts`);
    const comments = await response.json();
    const commentsList = document.getElementById("commentsList");

    commentsList.innerHTML = comments.map(comment => `
      <div class="comment">
        <h3>${comment.name}</h3>
        <p>${comment.message}</p>
        <small>${comment.created_at}</small>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error cargando comentarios:", error);
  }
}

// Función para obtener datos geográficos del usuario
async function getVisitorData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error("Error al obtener datos de IP");
    return await response.json();
  } catch (error) {
    console.error("Error usando ipapi.co:", error);
    return {
      ip: "No detectado",
      country_name: "Desconocido",
      currency: "USD", // Valor por defecto
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const slide = document.querySelector('.carousel-slide');
  const images = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let counter = 0;
  const size = images[0].clientWidth;
  let intervalId;

  // Función para mover el carrusel
  const moveSlide = (direction) => {
    if (direction === 'next') {
      counter = (counter >= images.length - 1) ? 0 : counter + 1;
    } else {
      counter = (counter <= 0) ? images.length - 1 : counter - 1;
    }
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.transform = `translateX(${-size * counter}px)`;
  };

  // Autoplay cada 3 segundos
  const startAutoplay = () => {
    intervalId = setInterval(() => moveSlide('next'), 3000);
  };

  // Detener autoplay al interactuar
  const stopAutoplay = () => {
    clearInterval(intervalId);
  };

  // Event listeners
  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    moveSlide('next');
    startAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    moveSlide('prev');
    startAutoplay();
  });

  // Reiniciar autoplay al dejar el ratón quieto
  slide.addEventListener('mouseenter', stopAutoplay);
  slide.addEventListener('mouseleave', startAutoplay);

  // Iniciar autoplay al cargar la página
  startAutoplay();
});

// Llamar al cargar la página
document.addEventListener('DOMContentLoaded', renderProducts);