import { IsIn, IsOptional } from "class-validator";
import { VitalsType } from "../vitals-type.enum";

export class VitalsFilterDto {
    @IsOptional()
    @IsIn([VitalsType.TEMPERATURE, VitalsType.HEARTBEAT, VitalsType.PRESSURE] )
    type: VitalsType;
}