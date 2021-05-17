import { UnauthorizedException } from "@nestjs/common";
import { Patient } from "src/auth/entities/patient.entity";
import { User } from "src/auth/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { VitalsFilterDto } from "./dto/vitals-filter.dto";
import { VitalsDto } from "./dto/vitals.dto";
import { VitalsType } from "./vitals-type.enum";
import { Vitals } from "./vitals.entity";

@EntityRepository(Vitals)
export class VitalsRepository extends Repository<Vitals> {

    async postVitalsDetails(
        vitalsDto: VitalsDto,
        patient: Patient,
        ): Promise<boolean>{
        
        if(patient != null) {
            const {type, value} = vitalsDto; 
            const vitals = new Vitals();
            vitals.type = type;
            vitals.value = value;
            vitals.patient = patient;

            try {
                await vitals.save();        
                delete vitals.patient;
                return true;
            } catch (error) {
                return false;
            }
        } else {
            throw new UnauthorizedException('Not Authorized');
        }
        
          
    }

    //with filters
    async getVitals(
        vitalsFileterDto: VitalsFilterDto,
        patient: Patient,
        ): Promise<Vitals[]> {
      
        if ( patient != null ) {
            const { type } = vitalsFileterDto;
            const query = this.createQueryBuilder('vitals');
            
            query.where('vitals.patientId = :patientId', { patientId:patient.id });

            if(type) {
                query.andWhere('vitals.type = :type', {type});
            }
            const vitals = await query.getMany();
            return vitals;
        } else {
            throw new UnauthorizedException('Not Authorized');
        }
    }

    async getVitalsByType(type: string, patient: Patient): Promise<Vitals[]> {
        
        if(patient != null) {
            const query = this.createQueryBuilder('vitals')
            query.where('vitals.patientId = :patientId', { patientId:patient.id });
            query.andWhere('vitals.type = :type', {type: type});
            const vitals = await query.getMany()
            return vitals;
        } else {
            throw new UnauthorizedException('Unauthorized');
        }
        
    }

    async getVitalsByIdType(type: VitalsType, id: number, user: User): Promise<Vitals[]> {
        if ( user.usertype === 'DOCTOR' || user.usertype === 'OPERATOR') {
            const query = this.createQueryBuilder('vitals');

            query.andWhere('vitals.patientId = :patientId', {patientId: id});
            query.andWhere('vitals.type = :type', {type: type});

            const vitals = await query.getMany();
            return vitals;
        }
    }

    async postVitalsById(id: number, vitalsDto: VitalsDto, user: User): Promise<boolean> {
        if ( user.usertype === 'DOCTOR' || user.usertype === 'OPERATOR') {
            const { type, value } = vitalsDto;
            
            const vitals = new Vitals();
            vitals.type = type;
            vitals.value = value;
            vitals.patientId = id;

            try {
                await vitals.save();
                return true;            
            } catch (error) {
                return error;
            }   
        } else {
            throw new UnauthorizedException();
        }
    }
}