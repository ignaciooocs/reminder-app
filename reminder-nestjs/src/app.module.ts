import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ReminderModule } from './reminder/reminder.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications/notifications.service';
import { ExpoTokenModule } from './expo-token/expo-token.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule, DatabaseModule, UserModule, ReminderModule, NotificationsModule, ExpoTokenModule, AuthModule],
  controllers: [],
  providers: [NotificationsService],
})
export class AppModule {}
