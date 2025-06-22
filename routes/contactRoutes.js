import { Router } from 'express';
import Contact from '../models/Contact.js';

const router = Router();

// Ruta para guardar un nuevo contacto (POST)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message, ip_address, country } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Crear el contacto en la DB
    const newContact = await Contact.create({
      name,
      email,
      message,
      ip_address: ip_address || null, // Si no se proporciona, se guarda como NULL
      country: country || null,
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 // Ruta para obtener todos los contactos (GET) isAuthenticated,
router.get('/contacts',  async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

import transporter from '../config/email.js';

router.post('/contact', async (req, res) => {
  const { name, email, message, ip_address, country } = req.body;

  try {
    // 1. Guardar en la DB (usando tu modelo Contact)
    const newContact = await Contact.create({ name, email, message, ip_address, country });

    // 2. Enviar email al remitente
    await transporter.sendMail({
      from: `"PetShop" <${process.env.EMAIL_USER}>`,
      to: email, // Email del remitente
      subject: '¡Gracias por tu comentario!',
      html: `
        <h1>Hola ${name},</h1>
        <p>Hemos recibido tu comentario en PetShop:</p>
        <blockquote>${message}</blockquote>
        <p>Nos pondremos en contacto pronto.</p>
        <p>📍 IP detectada: ${ip_address} (${country})</p>
      `,
    });

    // 3. Enviar email al administrador
    await transporter.sendMail({
      from: `"PetShop" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Email del admin (ej: admin@tuweb.com)
      subject: 'Nuevo comentario en PetShop',
      html: `
        <h1>Nuevo comentario de ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <p><strong>Ubicación:</strong> ${ip_address} (${country})</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error al guardar/enviar comentario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;