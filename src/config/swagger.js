export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      description: '',
      version: '1.0.4',
      title: 'payment_rabbitmq_node',
    }
  },
  apis: [
    "./src/usecases/auth/routes/auth.js",
    './src/usecases/health/routes/health.js', 
    "./src/usecases/user/routes/create_user.js",
    "./src/usecases/wallet/routes/add_money.js",
    "./src/usecases/payment/routes/create_payment.js",
  ]
}
