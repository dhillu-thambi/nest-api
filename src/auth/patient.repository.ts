import { UnauthorizedException } from "@nestjs/common";
import { Entity, EntityRepository, Repository } from "typeorm";
import { EditPatientDto } from "./dto/edit-patient.dto";
import { Patient } from "./entities/patient.entity";
import { User } from "./entities/user.entity";

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
    async getPatientEhr(user: User): Promise<any> {
        const query = this.createQueryBuilder('patient');
        query.where('patient.userId = :userId', {userId:user.id})
        const patient = await query.getOne()

        return patient;        
    }

    async getPatientEhrById(id: number, user: User): Promise<Patient> {
        if( user.usertype === 'DOCTOR', user.usertype === 'OPERATOR'){
            return await this.findOne(id);
        } else {
            throw new UnauthorizedException('Not Authorized');
        }
        
    }

    async editPatientEhr(editPatientDto: EditPatientDto, user: User): Promise<Patient> {
        if(user.usertype === 'PATIENT') {
            return await this.save({ ...editPatientDto, id: user.patient.id})
        } else {
            throw new UnauthorizedException();
        }
        
    }

    async editPatientEhrById(editPatientDto: EditPatientDto, user: User, id: number): Promise<Patient> {
        if(user.usertype === 'DOCTOR' || user.usertype === 'OPERATOR'){
            return await this.save({...editPatientDto, id: id});
        } else {
            throw new UnauthorizedException('Not Authorized');
        }
        
    }
}