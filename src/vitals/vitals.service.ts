import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { VitalsFilterDto } from './dto/vitals-filter.dto';
import { VitalsDto } from './dto/vitals.dto';
import { VitalsType } from './vitals-type.enum';
import { Vitals } from './vitals.entity';
import { VitalsRepository } from './vitals.respository';
import { Patient } from 'src/auth/entities/patient.entity';

@Injectable()
export class VitalsService {
    constructor(
        @InjectRepository(VitalsRepository)
        private vitalsRepository: VitalsRepository,
    ) {}
    
    //Get vitals details of a patient with and without type
    async getVitals(
        vitalsFilterDto: VitalsFilterDto,
        patient: Patient,
        ): Promise<Vitals[]> {
        return this.vitalsRepository.getVitals(vitalsFilterDto, patient);
    }

    //filter vitals details of a patient with type
    async getVitalsByType(
        type: VitalsType,
        patient: Patient,
        ): Promise<Vitals[]> {
        return this.vitalsRepository.getVitalsByType(type, patient);    
    }

    async postVitalsDetails(
        vitalsDto: VitalsDto,
        patient: Patient,
        ): Promise<boolean> {
        return this.vitalsRepository.postVitalsDetails(vitalsDto, patient); 
    }
    
    async getVitalsByIdType(
        type: VitalsType,
        id: number,
        user : User,
    ): Promise<Vitals[]> {
        return this.vitalsRepository.getVitalsByIdType(type, id, user);
    }

    async postVitalsById(
        id: number,
        vitalsDto: VitalsDto,
        user: User,
    ): Promise<boolean> {
        return this.vitalsRepository.postVitalsById(id, vitalsDto, user);
    }
}