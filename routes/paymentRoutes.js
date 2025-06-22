import { Router } from 'express';
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import Payment from '../models/Payment.js';

const router = Router();

// Ruta para procesar un pago (POST)
router.post('/payments', async (req, res) => {
  try {
    const {
      amount,
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      fullname,
      currency,
      description,
      reference,
      payment_date,
      transaction_id,
      message,
      success,
    } = req.body;

    // Validar campos obligatorios
    if (
      !amount || !card_number || !cvv || !expiration_month || !expiration_year ||
      !fullname || !currency || !description || !reference || !payment_date || !transaction_id || !message || !success
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Crear el pago en la DB
    const newPayment = await Payment.create({
      amount,
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      fullname,
      currency,
      description,
      reference,
      payment_date,
      transaction_id,
      message,
      success,
    });

    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta autenticada para obtener donaciones
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.findAll({ // Usa tu ORM (Sequelize, Mongoose, etc.)
      order: [['payment_date', 'DESC']] //
    });
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
