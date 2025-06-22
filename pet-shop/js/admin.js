const tableBody = document.querySelector('#donationsTable tbody');

// Cargar comentarios y donaciones desde tu API
async function loadAdminData() {
  try {
    // 1. Cargar comentarios
    const commentsRes = await fetch('http://localhost:3000/api/contacts');
    const comments = await commentsRes.json();
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments.map(c => `
      <div>
        <strong>${c.name}</strong> (${c.email})<br>
        <p>${c.message}</p>
        <small>${new Date(c.created_at).toLocaleString()}</small>
      </div>
    `).join('');

    // 2. Cargar donaciones
    const donationsRes = await fetch('http://localhost:3000/api/payments');
    const donations = await donationsRes.json();
    const donationsList = document.getElementById('donationsList');
    donationsList.innerHTML = donations.map(d => `
      <div>
        <strong>${d.amount} ${d.currency}</strong><br>
        <p>${d.message}</p>
        <small>Ref: ${d.reference}</small>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

// Mostrar perfil en el navbar
function displayUserProfile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const profileContainer = document.getElementById('userProfile');

  if (userData) {
    profileContainer.innerHTML = `
      <img src="${userData.picture || 'https://i.imgur.com/6VBx3io.png'}" 
           alt="Foto de perfil" 
           class="user-avatar">
      <span class="user-name">${userData.name}</span>
    `;
  } else {
    window.location.href = 'login.html'; // Redirigir si no hay datos
  }
}

// Ejecutar al cargar la página admin
if (window.location.pathname.includes('admin.html')) {
  displayUserProfile();
  setupLogout(); // Configurar botón de logout (ya implementado)
}

// Logout
function setupLogout() {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}

async function loadDonations() {
  try {
    const token = localStorage.getItem('token'); // Para JWT
    const response = await fetch('http://localhost:3000/api/payments');// Ajusta tu endpoint

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = 'login.html'; // Redirigir si no está autenticado
        return;
      }
      throw new Error('Error al cargar donaciones');
    }

    const donations = await response.json();
    renderDonationsTable(donations);
  } catch (error) {
    console.error('Error:', error);
    showError('No se pudieron cargar las donaciones');
  }
}

  $('#donationsTable').DataTable({ // Convierte la tabla en ordenable
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' // Español
    }
  });

function renderDonationsTable(donations) {
  const tableBody = document.querySelector('#donationsTable tbody');
  tableBody.innerHTML = donations.map(d => `
    <tr>
      <td class="monospace">${d.id}</td>
      <td class="monospace">${d.fullname}</td>
      <td class="monospace">${d.description || '—'}</td>
      <td class="monospace">${d.reference}</td>
      <td class="monospace">${new Date(d.payment_date).toLocaleString()}</td>
      <td class="monospace">${d.message}</td>
      <td class="monospace">${d.currency}</td>
      <td class="amount monospace">${d.amount.toFixed(2)}</td>
    </tr>
  `).join('');
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', loadDonations);