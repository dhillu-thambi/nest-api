import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserType } from "../enum/user-type.enum";
import * as bcrypt from 'bcrypt';
import { Vitals } from "src/vitals/vitals.entity";
import { Patient } from "./patient.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;
    
    @Column()
    usertype: UserType;

    @Column()
    salt: string;

    @OneToOne(() => Patient, patient => patient.user, {eager: true}) 
    patient: Patient;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}