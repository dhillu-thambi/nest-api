import { IsEmail } from "class-validator";
import { Vitals } from "src/vitals/vitals.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { GenderType } from "../enum/gendertype.enum";
import { User } from "./user.entity";

@Entity()
@Unique(['email'])
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    gender: GenderType;    

    @Column()
    phonenumber: number;
    
    @Column()
    caretakernumber: number;

    @Column()
    occupation: string;
    
    @Column()
    height: number;

    @OneToOne(() => User, user => user.patient, {eager: false}) 
    @JoinColumn()
    user: User;

    @OneToMany(type => Vitals, vital => vital.patient, {eager:true})
    vitals: Vitals[];

}