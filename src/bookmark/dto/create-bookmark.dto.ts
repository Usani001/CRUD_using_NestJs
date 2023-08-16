import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreatebookmarkDto{

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    desription?: string

    @IsString()
    @IsNotEmpty()
    link: string
}