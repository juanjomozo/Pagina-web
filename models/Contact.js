import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false, // NOT NULL
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false, // NOT NULL
    validate: {
      isEmail: true, // Validar formato de email
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false, // NOT NULL
  },
  ip_address: {
    type: DataTypes.TEXT,
  },
  country: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.TEXT,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // DEFAULT (datetime('now', 'localtime'))
  },
}, {
  timestamps: false, // Desactivar createdAt y updatedAt de Sequelize
  tableName: 'contacts', // Nombre de la tabla en SQLite
});

// Sincronizar el modelo con la DB (crea la tabla si no existe)
await Contact.sync();

export default Contact;