import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import{ Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "../entities/user.entity";
import { UserRepository } from "../user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'somesecret420'
        });
    }

    async validate(payload: JwtPayload) {
        const { email, usertype } = payload;
        const user = await this.userRepository.findOne({ email });
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}