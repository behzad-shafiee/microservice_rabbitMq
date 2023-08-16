import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { Response } from "express"
import { AuthService } from './auth.service'
import { GetUser } from './decorator/get-user.decorator'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { LocalAuthGuard } from './guard/local-auth.guard'
import { User, UserDocument } from './schema/user.schema'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class AuthController
{
  constructor ( private readonly authService: AuthService ) { }

  @Post( 'register' )
  async register ( @Body() registerDto: RegisterDto ): Promise<User> 
  {
    return await this.authService.register( registerDto )
  }

  @UseGuards( LocalAuthGuard )
  @Post( 'login' )
  async login ( @Body() loginDto: LoginDto, @GetUser() user: UserDocument, @Res( { passthrough: true } ) res: Response ): Promise<User | any> 
  {
    return await this.authService.login( user, res )
  }

  @UseGuards( JwtAuthGuard )
  @EventPattern( "user_authenticate" )
  async testProtected ( @GetUser() user: User ): Promise<User | any> 
  {
    return user
  }
}
