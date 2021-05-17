import { IsIn } from "class-validator";
import { VitalsType } from "../vitals-type.enum";

export class VitalsDto {
    
    @IsIn([VitalsType.PRESSURE, VitalsType.HEARTBEAT, VitalsType.TEMPERATURE])
    type: VitalsType; 
    value: string;
}