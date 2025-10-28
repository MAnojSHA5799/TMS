import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  signup(@Body() body: any) {
    console.log('📥 Received signup body:', body);
    return this.auth.signupAdmin(body);
  }

  @Post('login')
  login(@Body() body: {email:string,password:string}) {
    return this.auth.login(body.email, body.password);
  }
}
