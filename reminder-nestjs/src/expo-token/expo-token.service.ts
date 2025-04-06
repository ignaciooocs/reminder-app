import { Injectable } from '@nestjs/common';
import { CreateExpoTokenDto } from './dto/create-expo-token.dto';
import { ExpoToken } from './entities/expo-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpoTokenService {
  constructor(
    @InjectRepository(ExpoToken) private readonly expoTokenRepository: Repository<ExpoToken>,
  ) {}
  async create(createExpoTokenDto: CreateExpoTokenDto) {

    const expoToken = this.expoTokenRepository.create({
      token: createExpoTokenDto.token,
      user: { id: createExpoTokenDto.user },
    });
    return this.expoTokenRepository.save(expoToken);
  }

  findAllByUser(userId: number) {
    return this.expoTokenRepository.find({ where: { user: { id: userId } } });
  }

  findOne(token: string) {
    return this.expoTokenRepository.findOneBy({token});
  }

  update(id: number, isActive: boolean) {
    return this.expoTokenRepository.update(id, { isActive });
  }

  remove(id: number) {
    return this.expoTokenRepository.delete(id);
  }
}
