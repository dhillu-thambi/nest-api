import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { EditPatientDto } from './dto/edit-patient.dto';
import { PatientDto } from './dto/patient.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Patient } from './entities/patient.entity';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';

@Controller('api')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpDto: SignUpDto, @Body(ValidationPipe) patietDto: PatientDto): Promise<void> {
        return this.authService.signUp(signUpDto, patietDto);        
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{ accessToken: string}> {
        return this.authService.signIn(signInDto);
    } 

    @Get('/patient/ehr')
    @UseGuards(AuthGuard())
    getPatientEhr(@GetUser() user: User) {
        return this.authService.getPatientEhr(user);
    }

    @Get('/patient/ehr/:id')
    @UseGuards(AuthGuard())
    getPatientEhrById(
        @Param('id') id: number,
        @GetUser() user: User,
        ): Promise<Patient> {
        return this.authService.getPatientEhrById(id, user);
    }

    @Patch('/patient/ehr/:id')
    @UseGuards(AuthGuard())
    editPatientEhrById(
        @Body(ValidationPipe) editPatientDto: EditPatientDto,
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Patient> {
        return this.authService.editPatientEhrById(editPatientDto, user, id);
    }

    @Patch('/patient/ehr')
    @UseGuards(AuthGuard())
    editPatientEhr(
        @GetUser() user: User,
        @Body(ValidationPipe) editPatientDto: EditPatientDto,
        ): Promise<Patient> {            
        return this.authService.editPatientEhr(editPatientDto, user);  
    }
}
