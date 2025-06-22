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


// Validar CVV (3-4 dígitos)
document.getElementById("cvv").addEventListener("blur", function() {
  const isValid = /^\d{3,4}$/.test(this.value.trim());
  this.classList.toggle("invalid", !isValid);
  this.classList.toggle("valid", isValid);
});

// Validar número de tarjeta (16 dígitos)
document.getElementById("cardNumber").addEventListener("blur", function() {
  const isValid = /^\d{16}$/.test(this.value.trim());
  this.classList.toggle("invalid", !isValid);
  this.classList.toggle("valid", isValid);
});
