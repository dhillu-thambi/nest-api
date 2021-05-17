import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientDto } from './dto/patient.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { EditPatientDto } from './dto/edit-patient.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(PatientRepository)
        private patientRepository: PatientRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(singnUpDto: SignUpDto, patientDto: PatientDto): Promise<void> {
        return this.userRepository.signUp(singnUpDto, patientDto);
    }


    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const result = await this.userRepository.signIn(signInDto);

        if(!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        
        const { email, usertype } = result;        
        const payload: JwtPayload = { email, usertype };

        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};
    }

    async getPatientEhr(user: User): Promise<Patient> {
        return this.patientRepository.getPatientEhr(user)
    }

    async getPatientEhrById(id: number, user: User): Promise<Patient> {
        return this.patientRepository.getPatientEhrById(id, user)
    }

    async editPatientEhr(editPatientDto: EditPatientDto, user: User): Promise<Patient> {
        return this.patientRepository.editPatientEhr(editPatientDto, user);
    }

    async editPatientEhrById(editPatientDto: EditPatientDto, user: User, id: number): Promise<Patient> {
        return this.patientRepository.editPatientEhrById(editPatientDto, user, id);
    }
}
