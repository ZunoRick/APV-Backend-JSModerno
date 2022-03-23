import nodemailer from 'nodemailer';

const emailRegistro = async ({email, nombre, token}) =>{
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //Enviar email
  const info = await transport.sendMail({
    from: 'APV - Administrador de Pacientes de Veterinaria',
    to: email,
    subject: 'Comprueba tu cuenta con APV',
    text: 'Comprueba tu cuenta con APV',
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
      <p>Tu cuenta ya está lista, sólo debes comprobarla en el siguiente enlace: 
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este correo.</p>
    `
  });

  console.log('Mensaje enviado: %s', info.messageId);
};

export default emailRegistro;