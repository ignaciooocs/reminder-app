import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpoToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.expoTokens, { onDelete: 'CASCADE' })
    user: User;
}
