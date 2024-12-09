import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, data: UpdateUserDto) {
    if (!await this.findOne(id)) {
      throw new NotFoundException(`O usuário com ID ${id} não foi encontrado`);
    }

    return this.prisma.users.update({
      where: {
        id
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
  }

  async remove(id: number) {
    if (!await this.findOne(id)) {
      throw new NotFoundException(`O usuário com ID ${id} não foi encontrado`);
    }

    return this.prisma.users.delete({
      where: {
        id
      }
    });
  }
}
