
import { IsIn } from "class-validator";
import { Patient } from "src/auth/entities/patient.entity";
import { User } from "src/auth/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VitalsType } from "./vitals-type.enum";

@Entity()
export class Vitals extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    @IsIn([VitalsType.HEARTBEAT, VitalsType.PRESSURE, VitalsType.TEMPERATURE])
    type: VitalsType;

    @Column({type: 'timestamptz', default: ()=> 'CURRENT_TIMESTAMP'}) //Todo: specifying the type of timestamp
    dateTime: Date;

    @Column()
    value: string;

    @ManyToOne(type => Patient, patient => patient.vitals, {eager:false})
    patient: Patient;

    @Column()
    patientId: number;
}