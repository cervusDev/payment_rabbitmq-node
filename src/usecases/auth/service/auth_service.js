import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../user/repository/user_repository.js';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  };

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      throw new Error('Credenciais inválidas.');
    };

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Credenciais inválidas.');
    };

    const userToken = { id: user.id, email: user.email, name: user.name };

    const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      token,
      user: userToken
    }
  }
}