import { prisma } from '../../../config/prisma.js'

export class UserRepository {
  async findAll(){
    return prisma.user.findMany();
  }
  async findByEmail({ email }) {
    return prisma.user.findUnique({ where: { email }, omit: { createdAt: true } });
  };

  async findByUserId({ id }) {
    return prisma.user.findUnique({ where: { id }, omit: { password: true, createdAt: true } });
  };

  async createUser({ name, email, password }) {
    return await prisma.user.create({
      data: {
        email,
        name,
        password
      },
      omit: { password: true, createdAt: true, id: true }
    });
  };
}