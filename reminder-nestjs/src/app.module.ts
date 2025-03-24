import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [DatabaseModule, UserModule, ReminderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
