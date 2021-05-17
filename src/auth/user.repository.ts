import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { SignInDto } from "./dto/signin.dto";
import { Patient } from "./entities/patient.entity";
import { PatientDto } from "./dto/patient.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(signUpDto: SignUpDto, patientDto: PatientDto ): Promise<void> {
        const { name, email, password, usertype} = signUpDto;        
        
        const user = await new User();
        user.name = name;
        user.email = email;
        user.usertype = usertype;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);        

        if (usertype == 'PATIENT') {
            const patient = await new Patient();
            const {
                gender,
                phonenumber,
                caretakernumber,
                occupation,
                height,
            } = patientDto;
            patient.name = name;
            patient.email = email;
            patient.phonenumber = phonenumber;
            patient.caretakernumber = caretakernumber;
            patient.occupation = occupation;
            patient.height = height;
            patient.gender = gender;
            patient.user = user;

            try {
                await user.save();
                await patient.save();
            } catch (error) {
                console.log(error);                
            }    
        } else {
            try {
                await user.save();
            } catch (error) {
                if(error.code === '23505') {
                    throw new ConflictException('Email already exists');
                } else {
                    throw new InternalServerErrorException();
                }
            }
        }    
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;
        const user = await this.findOne({ email });

        if(user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }
}