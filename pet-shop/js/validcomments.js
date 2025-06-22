// Función para validar un campo y mostrar feedback visual
function validateField(field) {
  const value = field.value.trim();
  const isValid = value !== "";

  // Eliminar mensajes de error previos
  const existingError = field.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  // Aplicar estilos
  field.classList.remove("valid", "invalid");
  field.classList.add(isValid ? "valid" : "invalid");

  // Mostrar mensaje de error si es inválido
  if (!isValid) {
    const errorMsg = document.createElement("p");
    errorMsg.className = "error-message";
    errorMsg.textContent = "Este campo es obligatorio";
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
  }

  return isValid;
}


// Obtener todos los campos requeridos
const requiredFields = document.querySelectorAll("input[required], textarea[required], select[required]");

// Validar al perder el foco (evento blur)
requiredFields.forEach(field => {
  field.addEventListener("blur", () => validateField(field));
});

// Validar al escribir (evento input)
requiredFields.forEach(field => {
  field.addEventListener("input", () => {
    if (field.value.trim() !== "") {
      field.classList.add("valid");
      field.classList.remove("invalid");
      const errorMsg = field.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.remove();
      }
    }
  });
});

// Modificar el envío del formulario de comentarios
document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Validar todos los campos
  const fieldsValid = Array.from(requiredFields).every(field => validateField(field));

  if (fieldsValid) {
    // Resto del código de envío...
  }
});

document.getElementById("email").addEventListener("blur", function() {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
  this.classList.toggle("invalid", !isValid);
  this.classList.toggle("valid", isValid);
});

function checkFormValidity() {
  const submitButton = document.querySelector("#commentForm button");
  const allValid = Array.from(requiredFields).every(field => field.classList.contains("valid"));
  submitButton.disabled = !allValid;
}

requiredFields.forEach(field => {
  field.addEventListener("input", checkFormValidity);
});