// API Base URL (ajusta según tu backend)
const API_BASE = "http://localhost:3000/api";
const FAKE_PAYMENT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmFrZSBwYXltZW50IiwiZGF0ZSI6IjIwMjUtMDYtMDlUMjI6NDE6MDEuMDQ1WiIsImlhdCI6MTc0OTUwODg2MX0.V2re_mRU7hykSJ5jp5m9VUGrWXNTUdoQJj4rL9IJHyQ';
const FAKE_PAYMENT_URL = 'https://fakepayment.onrender.com/payments';

// Enviar donación
document.getElementById("donationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("first");
  const paymentData = {
    "amount": parseFloat(document.getElementById("amount").value),
    "card-number": document.getElementById('cardNumber').value.replace(/\s/g, ''),
    "cvv": document.getElementById('cvv').value.trim(),
    "expiration-month": document.getElementById('expMonth').value,
    "expiration-year": document.getElementById('expYear').value,
    "full-name": document.getElementById('fullname').value.trim(),
    "currency": document.getElementById('currency').value,
    "description": "cool-stuff",
    "reference": `TXN-${Math.random().toString(36).substr(2, 9)}`
  };

  // Mostrar carga
  const paymentResponse = document.getElementById("paymentResponse");
  paymentResponse.innerHTML = '<p class="loading">Procesando pago...</p>';

  // Simular pago
  const result = await simulatePayment(paymentData);

  console.log(result);
  // Mostrar resultado
  if (result.success) {
    paymentResponse.innerHTML = `
      <p class="success">✅ Pago exitoso! ID: ${result.data.reference}</p>
    `;
    console.log(`${API_BASE}/payments`);
    // Guardar en tu API (opcional)
    // await saveDonationInAPI(paymentData, result);
    const response = await fetch(`${API_BASE}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "amount": parseFloat(document.getElementById("amount").value),
        "card_number": document.getElementById('cardNumber').value.replace(/\s/g, ''),
        "cvv": document.getElementById('cvv').value.trim(),
        "expiration_month": document.getElementById('expMonth').value,
        "expiration_year": document.getElementById('expYear').value,
        "fullname": document.getElementById('fullname').value.trim(),
        "currency": document.getElementById('currency').value,
        "description": document.getElementById('donationMessage').value,
        "reference": result.data.reference,
        "payment_date": result.data.date,
        "transaction_id": result.data.transaction_id,
        "message": result.message,
        "success": result.success
      })
    }).then(response => {
      if (response.ok) {
        console.log("Paymentes updated successfully!");
        setTimeout(() => {
          document.getElementById("paymentForm").reset();
          location.reload();
        }, 5000);
      } else {
        alert("Error updating preferences. Please try again.");
      }
      //   .then((response) => response.json())
      //   .then((data) => console.log('Success:', data))
      //   .catch((error) => console.log('Error:', error))
    });
  } else {
    paymentResponse.innerHTML = `
      <p class="error">❌ Error: ${result.message || 'Revise los datos'}</p>
    `;
  }
});

async function simulatePayment(paymentData) {
  try {
    const response = await fetch(FAKE_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAKE_PAYMENT_TOKEN}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error en simulación de pago:', error);
    return { success: false, message: 'Error al procesar el pago' };
  }
}

// // Función para guardar en tu API (ajusta según tu backend)
// async function saveDonationInAPI(paymentData, fakeResult) {
//   const donationData = {
//     ...paymentData,
//     reference: `DON-${Date.now()}`,
//     transaction_id: fakeResult.payment_id || `TXN-${Math.random().toString(36).substr(2, 9)}`,
//     message: 'Donación simulada exitosa',
//     success: fakeResult.success ? 'success' : 'failed',
//   };

//   try {
//     await fetch(`${API_BASE}/payments`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(donationData),
//     });
//   } catch (error) {
//     console.error('Error al guardar en API:', error);
//   }
// }

