import { IsString, IsNotEmpty, IsPositive, IsPhoneNumber } from "class-validator"

export class CreateOrderDto
{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsPositive()
    price: number

    @IsPhoneNumber()
    phoneNumber: string
}
