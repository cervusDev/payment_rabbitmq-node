import axios from 'axios';

export const sendWelcomeEmail = async (email, name) => {
  try {
    axios.post(process.env.API_SEND_EMAIL, {
      "user_id": process.env.PUBLIC_EMAIL_KEY,
      "service_id": process.env.SERVICE_EMAIL_ID,
      "accessToken": process.env.PRIVATE_EMAIL_KEY,
      "template_id": process.env.TEMPLATE_EMAIL_ID,
      "template_params": {
        "name": name,
        "email": email,
      }
    });

    console.log('email enviado com sucesso');
  } catch (err) {
    throw new Error('erro ao enviar email:', err);
  };
};

export const sendMessageToInsertValueToWallet = async (
  name,
  price,
  email,
  debit_amount,
  total_amount,
  credit_amount,
) => {
  try {
    axios.post(process.env.API_SEND_EMAIL, {
      "user_id": process.env.PUBLIC_EMAIL_KEY,
      "service_id": process.env.SERVICE_EMAIL_ID,
      "accessToken": process.env.PRIVATE_EMAIL_KEY,
      "template_id": process.env.TEMPLATE_WALLET_ID,
      "template_params": {
        "name": name,
        "email": email,
        "price": price,
        "debit_amount": debit_amount,
        "total_amount": total_amount,
        "credit_amount": credit_amount,
      }
    });

    console.log('email enviado com sucesso');
  } catch (err) {
    throw new Error('erro ao enviar email:', e);

  }
};