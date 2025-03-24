import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  notifyAt: Date; // Fecha y hora en la que debe ocurrir el evento

  @Column({ default: 10 }) 
  remindBefore: number; // Minutos antes para notificar

  @Column({ default: false })
  notified: boolean;

  @Column({ default: false })
  readyToNotify: boolean;

  @ManyToOne(() => User, user => user.reminders)
  user: User;
}
