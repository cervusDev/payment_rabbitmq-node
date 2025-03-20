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
    './src/routes/health.js', 
    "./src/routes/login_user.js",
    './src/routes/create_user.js',
    "./src/routes/wallet/add_money.js",
  ]
}
