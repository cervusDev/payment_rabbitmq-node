import { UserService } from '../service/user_service.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
  };

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const data = await this.userService.createUser({ email, name, password })
      return res.status(200).json(data);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}