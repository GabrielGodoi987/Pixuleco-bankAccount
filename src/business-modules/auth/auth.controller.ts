import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  @Post('signin')
  signIn(@Body() authDto: SignInDto) {
    return authDto;
  }
  async signOut() {}
}
