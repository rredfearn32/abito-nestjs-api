import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return 'Register';
  }

  login() {
    return 'Login';
  }
}