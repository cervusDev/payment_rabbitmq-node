import { AuthService } from '../service/auth_service.js';

export class AuthController {
  constructor () {
    this.authService = new AuthService();
  };

  async login (req, res) {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login({ email, password });

      return res.status(200).json(data);
    } catch (err) {
      throw new Error(err.message);
    };
  }
}