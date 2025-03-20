import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthService } from '../service/auth_service.js';
import { UserRepository } from '../../user/repository/user_repository.js';

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../../user/repository/user_repository.js', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      findByEmail: jest.fn(),
      findByUserId: jest.fn(),
      createUser: jest.fn(),
    }))
  };
});

describe('AuthService', () => {
  let authService;
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = new UserRepository();
    // Mockando os métodos da instância
    mockUserRepository.findByEmail = jest.fn();
    mockUserRepository.findByUserId = jest.fn();
    mockUserRepository.createUser = jest.fn();

    authService = new AuthService();
    authService.userRepository = new UserRepository();

    authService.userRepository = mockUserRepository; // Passando o repositório para o AuthService
  });

  it('deve retornar um token e usuário quando as credenciais forem válidas', async () => {
    const mockUser = { id: 18, email: "gustavo.cervus@gmail.com", password: "senha", name: 'Gustavo' };
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true); // Simulando que a senha está correta
    jwt.sign.mockReturnValue('mockedToken'); // Retornando um token simulado

    const result = await authService.login({ email: "gustavo.cervus@gmail.com", password: "senha" });

    expect(result.token).toBe('mockedToken');
    expect(result.user).toEqual({ id: 18, email: "gustavo.cervus@gmail.com", name: 'Gustavo' });
  });

  it('deve lançar erro se o e-mail não for encontrado', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null); // Nenhum usuário encontrado

    try {
      await authService.login({ email: "nao.existe@dominio.com", password: "senha" });
    } catch (error) {
      expect(error.message).toBe('Credenciais inválidas.');
    }
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const mockUser = { id: 18, email: "gustavo.cervus@gmail.com", password: "senha", name: 'Gustavo' };
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false); // Simulando que a senha está incorreta

    try {
      await authService.login({ email: "gustavo.cervus@gmail.com", password: "senhaErrada" });
    } catch (error) {
      expect(error.message).toBe('Credenciais inválidas.');
    }
  });

  it('deve gerar um token JWT válido', async () => {
    const mockUser = { id: 18, email: "gustavo.cervus@gmail.com", password: "senha", name: 'Gustavo' };
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true); // Simulando que a senha está correta
    jwt.sign.mockReturnValue('mockedToken'); // Retornando um token simulado

    const result = await authService.login({ email: "gustavo.cervus@gmail.com", password: "senha" });
    expect(result.token).toBe('mockedToken');
  });

  it('deve lançar erro se o token JWT falhar', async () => {
    const mockUser = { id: 18, email: "gustavo.cervus@gmail.com", password: "senha", name: 'Gustavo' };
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true); // Simulando que a senha está correta
    jwt.sign.mockImplementation(() => { throw new Error('JWT error'); }); // Simulando falha na criação do token

    try {
      await authService.login({ email: "gustavo.cervus@gmail.com", password: "senha" });
    } catch (error) {
      expect(error.message).toBe("JWT error");
    }
  });
});
