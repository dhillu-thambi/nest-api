import { IsIn, IsString } from "class-validator";
import { GenderType } from "../enum/gendertype.enum";

export class PatientDto {
    
    @IsIn([GenderType.FEMALE, GenderType.MALE, GenderType.OTHER])
    gender: GenderType;

    phonenumber: number;

    caretakernumber: number;

    @IsString()
    occupation: string;

    height: number;
}