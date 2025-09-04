import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { SignedUser } from './interface/signed-user.interface';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    // busca o user por emai, pra ver se ele existe
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const payload: SignedUser = {
      name: user.name,
      email,
      jwtKey: String(this.configService.get<string>('PRIVATE_JWT_KEY')),
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('PRIVATE_JWT_KEY'),
      }),
    };
  }
}
