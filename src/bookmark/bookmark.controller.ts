import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreatebookmarkDto, EditbookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

constructor(private bookMarkService: BookmarkService){}

@Post('createbookmark')
createBookmarks(
    @GetUser('id') userId: number,
    @Body() dto: CreatebookmarkDto){

return this.bookMarkService.createBookmarks(userId, dto)

    
}


@Get(':id')
getAllBookmarks(
    @GetUser('id') userId: number,){
return this.bookMarkService.getAllBookmarks(userId)
}



@Get(':id')
getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,){
return this.bookMarkService.getBookmarkById(userId, bookmarkId)
}



@Patch(':id')
editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditbookmarkDto){
    
return this.bookMarkService.editBookmarkById(userId, bookmarkId, dto)
}


@HttpCode(HttpStatus.NO_CONTENT)
@Delete(':id')
deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number){

return this.bookMarkService.deleteBookmarkById(userId, bookmarkId)
}
}
