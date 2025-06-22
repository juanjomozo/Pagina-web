import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import './config/passport.js'; // Configuración de Passport
import './models/User.js'; // Sincronizar modelo con DB
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


const app = express();

// Middlewares
app.use(express.static('public'));
app.use(
  cors({
    origin: "http://localhost:5500",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // Middleware para parsear JSON
// 
// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());
// Middleware de cors para todos las Http
app.use(function (req, res, next) {
	// set the CORS policy
	res.header('Access-Control-Allow-Origin', '*');
	// set the CORS headers
	res.header(
		'Access-Control-Allow-Headers',
		'origin, X-Requested-With,Content-Type,Accept, Authorization'
	);
	// set the CORS method headers
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
		return res.status(200).json({});
	}
	next();
});

// Rutas
app.use('/', authRoutes);
app.use('/', profileRoutes);
// Usar rutas de contactos
app.use('/api', contactRoutes); // Ejemplo: /api/contact, /api/contacts
// Usar rutas de pagos
app.use('/api', paymentRoutes); // Ejemplo: POST /api/payments, GET /api/payments


// Vista de inicio
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});