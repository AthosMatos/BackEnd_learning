import {
    Length,
    IsEmail,
    IsDate,
    MinLength,
    IsString,
    IsNumber,
    IsNotEmpty,
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
    constructor(personData: Person) {
        this._id = personData._id
        this.FirstName = personData.FirstName
        this.LastName = personData.LastName
        this.name = personData.name
            ? personData.name
            : `${personData.FirstName} ${personData.LastName}`
        if (personData.userData) {
            this.userData.address = personData.userData.address
            this.userData.birthDate = personData.userData.birthDate
            this.userData.cpf = personData.userData.cpf
            this.userData.email = personData.userData.email
            this.userData.password = personData.userData.password
            this.userData.phone = personData.userData.phone
        } else this.userData = undefined

        if (personData.moneyData) {
            this.moneyData.creditAmount = personData.moneyData.creditAmount
            this.moneyData.creditCard = personData.moneyData.creditCard
            this.moneyData.creditScore = personData.moneyData.creditScore
            this.moneyData.moneyInAccount = personData.moneyData.moneyInAccount
        } else this.moneyData = undefined
    }

    _id: string
    @IsString() @IsNotEmpty() FirstName: string
    @IsString() @IsNotEmpty() LastName: string
    @IsString() name: string
    userData: userData
    moneyData: moneyData
}
