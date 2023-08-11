import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class AuthService
{
  constructor (
    @Inject( 'AUTH_SERVICE' ) private client: ClientProxy
  ) { }

  auth (): string
  {
    const pattern = "auth"
    const data = {
      status: "success",
      message: "user authentication done succussfully"
    }
    this.client.send(pattern, data)
    return 
  }
}
