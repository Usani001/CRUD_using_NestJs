import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { use } from 'passport';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService){}


@Get('getauser')
getUser(@GetUser() user: User){
return user;
}

@Patch()
editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto){

    const user = this.userService.editUser(userId, dto);
    return user;
}
}
