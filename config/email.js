import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // O usar SMTP manual (para otros servicios)
  auth: {
    user: process.env.EMAIL_USER, // Tu correo (ej: tu@gmail.com)
    pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación (no la personal)
  },
});

export default transporter;