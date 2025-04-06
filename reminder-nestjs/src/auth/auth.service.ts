import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({ ...createUserDto, password: hashedPassword });
    return { message: 'Usuario registrado con éxito', user };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return { message: 'Usuario autenticado con éxito', user };
  }

  async logout(pushToken: string): Promise<any> {
    const token = await this.userService.findPushToken(pushToken);
    if (!token) {
      throw new BadRequestException('Token no encontrado');
    }
    await this.userService.updatePushToken(token);
    return { message: 'Logout exitoso, token inactivado' };
  }
}
