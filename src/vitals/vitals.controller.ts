import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { VitalsFilterDto } from './dto/vitals-filter.dto';
import { VitalsDto } from './dto/vitals.dto';
import { Vitals } from './vitals.entity';
import { VitalsService } from './vitals.service';
import { AuthGuard } from '@nestjs/passport';
import { VitalsType } from './vitals-type.enum';
import { GetPatient } from 'src/auth/decorators/get-patient.decorator';
import { Patient } from 'src/auth/entities/patient.entity';

@Controller('/api/patient/vitals')
@UseGuards(AuthGuard())
export class VitalsController {
    constructor(private vitalsService: VitalsService) {}

    @Get('/:type/:patientId')
    @UsePipes(ValidationPipe)
    getVitalsByIdType(        
        @Param('type') type: VitalsType,
        @Param('patientId', ParseIntPipe) patientId: number,
        @GetUser() user: User,
    ): Promise<Vitals[]> {
        return this.vitalsService.getVitalsByIdType(type, patientId, user);
    }

    @Get('/:type')
    getVitalsByType(
        @Param('type') type: VitalsType,
        @GetPatient() patient: Patient,
        ): Promise<Vitals[]> {
        return this.vitalsService.getVitalsByType(type, patient);
    }

    @Get()
    getVitals(
        @Query(ValidationPipe) vitalsFileterDto: VitalsFilterDto,
        @GetPatient() patient: Patient,
        ) {
        return this.vitalsService.getVitals(vitalsFileterDto, patient);
    }    

    @Post()
    @UsePipes(ValidationPipe)
    postVitals(
        @Body() vitalsDto: VitalsDto,
        @GetPatient() patient: Patient,
    ): Promise<boolean> {
        return this.vitalsService.postVitalsDetails(vitalsDto, patient);
    }

    //Todo: Is it better to take the type out of path and pass it as dto?
    @Post('/:patientId') 
    postVitalsById(
        @Param('patientId') patientId: number,
        @Body() vitalsDto: VitalsDto,
        @GetUser() user: User, 
    ) { 
        return this.vitalsService.postVitalsById(patientId, vitalsDto, user);
    }
}
