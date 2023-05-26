import {
    Length,
    IsEmail,
    IsDate,
    MinLength,
    IsString,
    IsNumber,
    IsNotEmpty,
} from 'class-validator'

export class IMG {
    constructor(personData: IMG) {
        this._id = personData._id
        this.name = personData.name
        this.img.data = personData.img.data
        this.img.contentType = personData.img.contentType
    }

    _id: string
    @IsString() @IsNotEmpty() name: string
    @IsNotEmpty() img: {
        data: Buffer
        contentType: String
    }
}
