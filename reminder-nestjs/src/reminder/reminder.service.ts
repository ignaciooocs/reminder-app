import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import * as moment from 'moment-timezone';

@Injectable()
export class ReminderService {

  constructor(
    @InjectRepository(Reminder) private readonly reminderRepository: Repository<Reminder>,
    private readonly userService: UserService
  ) {}

  // Función para convertir una marca de tiempo UTC a la hora local de Santiago de Chile
  private convertToSantiagoTime(utcTime: Date): string {
    const localTime = moment(utcTime).tz('America/Santiago');
    localTime.seconds(0); // Establecer los segundos a cero
    return localTime.format('YYYY-MM-DD HH:mm:ss');
  }

  async create(createReminderDto: CreateReminderDto) {
    
    try {
      const user = await this.userService.findOne(createReminderDto.user);

      if (!user) {
        throw new Error('User not found');
      }

      const notifyAt = new Date(Date.now() + createReminderDto.afterMinutes * 60 * 1000);
      const localTime = this.convertToSantiagoTime(notifyAt);
      console.log(localTime);

      const reminder = this.reminderRepository.create({
        message: createReminderDto.message,
        notifyAt: localTime,
        user
      });

      return await this.reminderRepository.save(reminder);

    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.reminderRepository.find();
  }

  findOne(id: number) {
    try {
      
      return this.reminderRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateReminderDto: UpdateReminderDto) {
    return `This action updates a #${id} reminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminder`;
  }
}
