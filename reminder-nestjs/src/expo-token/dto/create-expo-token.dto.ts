import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpoTokenDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsNumber()
    @IsNotEmpty()
    user: number;
}
