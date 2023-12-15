const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const jsonwebtoken = require("jsonwebtoken");

const AuthError = require('../exceptions/AuthError')


async function login (req, res, next) {
// Recuperare i dati inseriti dall'utente
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password sono richieste' });
  }

  // controllare che ci sia un utente con quella email
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  });

  if (!user) {
    return next(new AuthError("Utente non trovato"));
  }

  // controllare che la password sia corretta
  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    return next(new AuthError("Password errata"));
  }

  // generare il token JWT
  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // ritornare il token ed i dati dell'utente

  // rimuovo la password dall'oggetto user
  delete user.password;

  res.json({ user, token });
}

module.exports = {
    login
}