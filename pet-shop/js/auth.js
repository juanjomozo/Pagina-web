// Configuración de Google OAuth
const clientId = '548665091423-v8c3onptf16v2vj0inh8mbqckocnn0g2.apps.googleusercontent.com'; // Reemplaza con tu ID real
let user = null;

function initAuth() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: clientId,
        }).then(() => {
            console.log('Google Auth inicializado');
        });
    });
}

// Login con Google
document.getElementById('loginBtn')?.addEventListener('click', () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
        user = googleUser.getBasicProfile();
        localStorage.setItem('user', JSON.stringify({
            name: user.getName(),
            email: user.getEmail(),
            image: user.getImageUrl()
        }));
        window.location.href = 'admin.html';
    });
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
});

// Verificar sesión al cargar
function checkAuth() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        user = JSON.parse(savedUser);
        document.getElementById('userProfile').textContent = user.name;
    } else {
        window.location.href = 'index.html';
    }
}

// Cargar SDK de Google
function loadGoogleSDK() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=initAuth';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Inicializar
if (window.location.pathname.includes('admin.html')) {
    checkAuth();
} else {
    loadGoogleSDK();
}
