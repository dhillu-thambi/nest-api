import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString } from "class-validator";
import { GenderType } from "../enum/gendertype.enum";
import { UserType } from "../enum/user-type.enum";
import { SignUpDto } from "./signup.dto";

// export class EditPatientDto extends PartialType(SignUpDto) {}

export class EditPatientDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsIn([UserType.DOCTOR, UserType.PATIENT, UserType.OPERATOR])
    usertype?: UserType;

    @IsOptional()
    @IsIn([GenderType.FEMALE, GenderType.MALE, GenderType.OTHER])
    gender?: GenderType;

    @IsOptional()
    phonenumber?: number;

    @IsOptional()
    caretakernumber?: number;

    @IsOptional()
    @IsString()
    occupation?: string;

    @IsOptional()
    height?: number;
}