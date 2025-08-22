import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
  }
}
