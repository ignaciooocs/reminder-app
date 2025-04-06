import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpoTokenService } from 'src/expo-token/expo-token.service';
import { ExpoToken } from 'src/expo-token/entities/expo-token.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly expoTokenService: ExpoTokenService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findPushToken(pushToken: string): Promise<ExpoToken | null> {
    return this.expoTokenService.findOne(pushToken);
  }

  async updatePushToken(token: ExpoToken) {
    const expoToken = await this.expoTokenService.findOne(token.token);
    if (!expoToken) {
      throw new NotFoundException('Token no encontrado');
    }
    const updatedToken = await this.expoTokenService.update(expoToken.id, false);
    return updatedToken;
  }
}
