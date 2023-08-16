import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {

constructor(private prisma: PrismaService){}
async editUser(userId: number, dto: EditUserDto){

    try{

        const user = await this.prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              email: dto.email,
            },
          });
          delete user.hash;
          return user;
}catch(error){
    throw new Error('unable to update user')
}

}
}
