import { ForbiddenException, Injectable, NotFoundException, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { promises } from "dns";


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}

    async signup(dto: AuthDto){

        // generate the hash password
        const hash = await argon.hash(dto.password);

        // save the new user in the database
        try{
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        });
        delete user.hash;

        // return the saved user
        
       return user;
    }catch(error){
        if (error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('Credentials Taken',
                );
            }
        }
        throw error;
    }
    }




    async login(dto: AuthDto){
        //find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        //if user does not exist, throw exception
        if (!user ) throw new ForbiddenException('Credentials Incorrect');

        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password);

        //if password incorrect, throw exception
        if(!pwMatches) throw new ForbiddenException('Credentials Incorrect');

        delete user.hash;

        //send back user
        return this.signToken(user.id, user.email);
    }


   async signToken(userId: number, email: string): Promise <{access_token: string}>{

        const payload = {
            sub: userId, email
        }
        const secret = this.config.get('JWT_SECRET');
       const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m', 
            secret: secret
        });


        return {
            access_token: token,
        };
    }   
}