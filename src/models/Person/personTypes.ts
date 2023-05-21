import {
    Length,
    IsEmail,
    IsDate,
    MinLength,
    IsString,
    IsNumber,
    IsNotEmpty,
    ValidationOptions,
} from 'class-validator'

class userData {
    @IsEmail() email: string
    @IsString() @MinLength(6) password: string
    @IsString() address: string
    @IsString() @Length(11, 11) phone: string
    @IsString() @Length(11, 11) cpf: string
    @IsString() @IsDate() birthDate: Date
}

class moneyData {
    @IsNumber() creditAmount: number
    @IsString() creditCard: string
    @IsNumber() creditScore: number
    @IsNumber() moneyInAccount: number
}

export class Person {
    _id: string
    @IsString() @IsNotEmpty() FirstName: string
    @IsString() @IsNotEmpty() LastName: string
    @IsString() name: string
    userData: userData
    moneyData: moneyData
}
