import { IsEmail, IsIn, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { GenderType } from "../enum/gendertype.enum";
import { UserType } from "../enum/user-type.enum";

export class SignUpDto {
    // TODO: ADD more validation rules
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsIn([UserType.DOCTOR, UserType.PATIENT, UserType.OPERATOR])
    usertype: UserType;

    @IsIn([GenderType.FEMALE, GenderType.MALE, GenderType.OTHER])
    gender: GenderType;

    phonenumber: number;

    caretakernumber: number;

    @IsString()
    occupation: string;

    height: number;
}