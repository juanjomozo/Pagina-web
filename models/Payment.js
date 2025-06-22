import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Payment = sequelize.define('Payment', {
  amount: {
    type: DataTypes.REAL,
    allowNull: false,
    validate: {
      isFloat: { min: 0.01 }, // Validar que el monto sea positivo
    },
  },
  card_number: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isCreditCard: true, // Validar formato de tarjeta de crédito
    },
  },
  cvv: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [3, 4], // CHECK(length(cvv) BETWEEN 3 AND 4)
    },
  },
  expiration_month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12, // CHECK(expiration_month BETWEEN 1 AND 12)
    },
  },
  expiration_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 2023, // CHECK(expiration_year >= 2023)
    },
  },
  fullname: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isIn: [['USD', 'EUR', 'MXN']], // CHECK(currency IN ('USD', 'EUR', 'MXN'))
    },
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null, // DEFAULT NULL
  },
  reference: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.TEXT,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // DEFAULT (datetime('now', 'localtime'))
  },
  transaction_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  success: {
    type: DataTypes.TEXT,
    allowNull: false,
    // validate: {
    //   isIn: [['success', 'failed', 'pending']], // Ejemplo: valores permitidos
    // },
  },
}, {
  timestamps: false, // Desactivar createdAt y updatedAt de Sequelize
  tableName: 'payments',
});

// Sincronizar el modelo con la DB
await Payment.sync();

export default Payment;


