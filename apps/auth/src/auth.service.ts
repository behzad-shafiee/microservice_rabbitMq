import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from "@nestjs/microservices"
import { User } from './schema/user.schema'
import { LoginDto } from './dto/login.dto'
import { Response } from "express"

@Injectable()
export class AuthService
{
  constructor (
    @Inject( 'AUTH_SERVICE' ) private client: ClientProxy
  ) { }

  login ( loginDto: LoginDto, res: Response ): Promise<User>
  {

    return
  }
}
