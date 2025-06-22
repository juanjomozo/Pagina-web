import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  googleId: { type: DataTypes.STRING, unique: true },
  displayName: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  avatar: DataTypes.STRING,
});

// Sincronizar el modelo con la DB (crea la tabla si no existe)
await User.sync();

export default User;