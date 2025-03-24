import { prisma } from '../../../config/prisma.js'

export class UserRepository {
  constructor () {
    this.prisma = prisma
  }
  async findAll(){
    return this.prisma.user.findMany();
  };

  async findByEmail({ email }) {
    return this.prisma.user.findUnique({ where: { email }, omit: { createdAt: true } });
  };

  async findByEmailToTest({ email }) {
    return this.prisma.user.findUnique({ where: { email }, omit: { password: true, createdAt: true } })
  };

  async findByUserId({ id }) {
    return this.prisma.user.findUnique({ where: { id }, omit: { password: true, createdAt: true } });
  };

  async createUser({ name, email, password }) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password
      },
      omit: { password: true, createdAt: true, id: true }
    });
  };
}