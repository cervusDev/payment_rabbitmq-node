export class IEmailRepository {
  WelcomeData ({ name, email }) {
    return {
      "user_id": process.env.PUBLIC_EMAIL_KEY,
      "service_id": process.env.SERVICE_EMAIL_ID,
      "accessToken": process.env.PRIVATE_EMAIL_KEY,
      "template_id": process.env.TEMPLATE_EMAIL_ID,
      "template_params": {
        "name": name,
        "email": email,
      }
    }
  }

  PaymentSuccedData({
    name,
    email,
    amount,
    status,
    stripeId,
    payment_method,
  }) {
    return {
      "user_id": process.env.PUBLIC_EMAIL_KEY,
      "service_id": process.env.SERVICE_EMAIL_ID,
      "accessToken": process.env.PRIVATE_EMAIL_KEY,
      "template_id": process.env.TEMPLATE_PAYMENT_CONFIRM,
      "template_params": {
        "name": name,
        "email": email,
        "amount": amount,
        "status": status,
        "stripeId": stripeId,
        "payment_method": payment_method
      }
    }
  }
}