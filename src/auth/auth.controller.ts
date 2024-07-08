
import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy,) { }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto)
      .pipe(
        catchError((error) => {
          throw new RpcException({ status: 400, message: error.message });
        })
      );
  }
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException({ status: 400, message: error.message });
      })
    );;
  }

  @Get('/verify')
  verify() {
    return this.client.send('auth.verify.user', {}).pipe(
      catchError((error) => {
        throw new RpcException({ status: 400, message: error.message });
      })
    );;
  }


}
