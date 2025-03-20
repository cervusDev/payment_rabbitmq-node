import bcrypt from 'bcryptjs';
import { emailValidator } from '../../../validators/email.js';
import { sendWelcomeEmail } from '../../../config/emailjs.js';
import { UserRepository } from '../repository/user_repository.js';
import { walleRepository } from '../../wallet/repository/wallet_repository.js';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.walletRepository = walleRepository;
  };

  async createUser({ name, email, password }) {
    if (!emailValidator(email)){
      throw new Error('Email inválido!'); 
    };

    const user = await userRepository.findByEmail({ email });

    if (user) {
      throw new Error('Email já foi cadastrado por outro usuário!');
    };

    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await userRepository.createUser({ name, email, password: hashPassword });
      
      if (!newUser) {
        throw new Error('Erro ao criar o usuário!');
      };

      const wallet = await walleRepository.createWallet({ userId: newUser.id })
      
      if (!wallet) {
        throw new Error('Erro ao criar carteira do usuário, por favor acione a equipe interna!');
      };

      await sendWelcomeEmail(newUser.email, newUser.name)

      return {
        name,
        email,
        id: newUser.id,
        createdAt: newUser.createdAt
      }
    } catch (err) {

    }
  }
}