import { Module } from '@nestjs/common';
import { ExpoTokenService } from './expo-token.service';
import { ExpoTokenController } from './expo-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpoToken } from './entities/expo-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpoToken])],
  controllers: [ExpoTokenController],
  providers: [ExpoTokenService],
  exports: [ExpoTokenService],
})
export class ExpoTokenModule {}
