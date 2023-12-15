const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcrypt");


async function hashPassword(password) {
  const saltRounds = 1;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function mainUser() {
  const plainPassword = 'password_admin';
  const hashedPassword = await hashPassword(plainPassword);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: hashedPassword
    }
  })

}
mainUser()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
