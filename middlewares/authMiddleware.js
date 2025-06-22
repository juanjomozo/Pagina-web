export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'No autorizado. Debes iniciar sesión.' });
};

// export const isAdmin = (req, res, next) => {
//   if (req.user.role === 'admin') { // Asume que tu modelo User tiene un campo 'role'
//     return next();
//   }
//   res.status(403).json({ error: 'Acceso prohibido. Se requiere rol de administrador.' });
// };