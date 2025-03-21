import { UserRepository } from '../repository/user_repository.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

describe('UserRepository', () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  describe('findByEmail', () => {
    it('deve retornar o usuário quando o e-mail for encontrado', async () => {
      const mockUser = { id: 18, email: 'gustavo.cervus@gmail.com', name: 'Gustavo' };
      const result = await userRepository.findByEmailToTest({ email: mockUser.email });

      expect(result).toEqual(mockUser);
    });

    it('deve retornar null quando o e-mail não for encontrado', async () => {
      const result = await userRepository.findByEmail({ email: 'inexistente@example.com' });

      expect(result).toBeNull();
    });
  });

  describe('findByUserId', () => {
    it('deve retornar o usuário quando o ID for encontrado', async () => {
      const mockUser = { id: 18, email: 'gustavo.cervus@gmail.com', name: 'Gustavo' };
      const result = await userRepository.findByUserId({ id: mockUser.id });

      expect(result).toEqual(mockUser);
    });

    it('deve retornar null quando o ID não for encontrado', async () => {
      const result = await userRepository.findByUserId({ id: 999 });
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      const users = await userRepository.findAll();
      const userId = users[users.length - 1].id;
      
      const userData = { name: 'User', email: `user${userId + 1}@example.com`, password: 'password' };
      const createdUser = { name: 'User', email: `user${userId + 1}@example.com` };

      const result = await userRepository.createUser(userData);
      expect(result).toEqual(createdUser);
    });
  });
});
