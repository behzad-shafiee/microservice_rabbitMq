import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { User } from './schema/user.schema'
import { Response } from "express"
@Controller( 'auth' )
export class AuthController
{
  constructor ( private readonly authService: AuthService ) { }

  @Post()
  async login ( @Body() loginDto: LoginDto, @Res( { passthrough: true } ) res: Response ): Promise<User>
  {
    const result = await this.authService.login( loginDto, res )
    res.json( result )
  }
}
