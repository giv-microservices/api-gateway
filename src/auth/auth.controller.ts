
import { Controller, Post, Body, Inject, Get, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guard/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentRequestUser } from './types/current-resquest-user.type';
import { Token } from './decorators/token.decorator';

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


  @UseGuards( AuthGuard )
  @Get('verify')
  verifyToken( @User() user: CurrentRequestUser, @Token() token: string  ) {
    // si el guard AuthGuard añade el usuario y el token a la request
    // entonces podemos extraerlos con los decoradores User y Token
    // eso es lo que retornamos aqui
    return { user, token }
  }

}
