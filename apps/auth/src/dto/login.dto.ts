import { IsEmail, IsStrongPassword } from "class-validator"

export class LoginDto
{

    @IsEmail()
    email: string

    @IsStrongPassword( { minLength: 8, minNumbers: 1, minUppercase: 1, minLowercase: 1, minSymbols: 1 },
        { message: "password must be atleast 8 character and consist of one number , one lowercase , one uppercase and one special character" } )
    password: string
}