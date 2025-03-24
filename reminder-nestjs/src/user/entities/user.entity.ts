import { Reminder } from 'src/reminder/entities/reminder.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @Column({})
    password: string;

    @Column('text', { array: true, nullable: true })
    expoTokens: string[]; // Almacena los Expo Push Tokens
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Reminder, (reminder) => reminder.user)
    reminders: Reminder[];

}
