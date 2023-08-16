import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatebookmarkDto, EditbookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService){}

async createBookmarks(userId: number, dto: CreatebookmarkDto){

    const bookmark = await this.prisma.bookmark.create({
        data: {
            userId,
            ...dto
        }
    })


    return bookmark;
}


getAllBookmarks(userId: number){

    return this.prisma.bookmark.findMany({
        where: {
            userId
        }
    })

}

getBookmarkById(userId: number, bookmarkId: number){
    return this.prisma.bookmark.findFirst(
        {
            where: {
                userId,
                id: bookmarkId
            }
        }
    )

}

async editBookmarkById(userId: number,bookmarkId: number, dto: EditbookmarkDto){

    const bookmark = await this.prisma.bookmark.findUnique({
        where: {
            id: bookmarkId
        }
    })
    if (!bookmark || bookmark.userId == userId) 
        throw new ForbiddenException('Access to resource denied')
    

    return this.prisma.bookmark.update({
        where: {
            id: bookmarkId
        },
        data: {
            ...dto,
        }
    })

    
}

async deleteBookmarkById(userId: number, bookmarkId: number){

    const bookmark = await this.prisma.bookmark.findUnique({
        where: {
            id: bookmarkId
        }
    })
    if (!bookmark || bookmark.userId == userId) 
        throw new ForbiddenException('Access to resource denied')
    

    return this.prisma.bookmark.delete({
        where: {
            id: bookmarkId,
        
}
})
}
}