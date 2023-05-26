import {
    Length,
    IsEmail,
    IsDate,
    MinLength,
    IsString,
    IsNotEmpty,
} from 'class-validator'

export class User {
    constructor(userData: User, singin: boolean = false) {
        this._id = userData._id
        if (singin) this.username = 'tempName'
        else this.username = userData.username
        this.email = userData.email
        this.password = userData.password
        this.role = userData.role
    }
    _id: string
    @IsString() @IsNotEmpty() username: string
    @IsString() @IsNotEmpty() @IsEmail() email: string
    @IsString() @IsNotEmpty() password: string
    role: string
}
