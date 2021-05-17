import { UserType } from "../enum/user-type.enum";

export interface JwtPayload {
    email: string;
    usertype: UserType;
}