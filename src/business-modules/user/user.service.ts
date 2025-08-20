import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from 'src/database/entities/user.entity';
import { PaginatedResponse } from 'src/commons/interfaces/PaginatedResponse';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response.user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { cpf } = createUserDto;
    const user = await this.userRepository.findByCpf(cpf);
    if (user) {
      throw new BadRequestException(`user with cpf: ${cpf} already exists`);
    }
    // TODO: criamos uma conta padrao para o usuario, caso ele queira
    // TODO: criamos o usuario
    return await this.userRepository.RegisterUser(createUserDto);
  }

  async findAll({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<PaginatedResponse<ResponseUserDto>> {
    try {
      const users = await this.userRepository.findAllPaginated({
        offset,
        limit,
      });
      const countUsers = await this.userRepository.countUsers();

      const responseUser = plainToInstance(ResponseUserDto, users);

      return {
        current: offset,
        next: offset !== countUsers ? offset + 1 : null,
        previous: offset === 0 ? null : offset - 1,
        totalPages: Math.ceil(limit / countUsers),
        items: responseUser,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    console.log(cpf);
    const userExists = await this.userRepository.findByCpf(cpf);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    return userExists;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { cpf } = updateUserDto;
    if (user.cpf !== cpf) {
      throw new BadRequestException('User sent a different cpf!');
    }

    return await this.userRepository.updateUser({
      id,
      ...updateUserDto,
    });
  }

  async remove(id: string) {
    try {
      // TODO: Delete user request
      // before delete an user we need a serial permission
      // cpf confirmation
      // user confirmation
      // why its being deleted
      // admin confirmation email with the description
      // use ques to do that
      await this.findOne(id);

      return this.userRepository.deleteUser(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
