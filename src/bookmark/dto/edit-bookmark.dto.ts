import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditbookmarkDto{

    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    desription?: string

    @IsString()
    @IsOptional()
    link?: string
}