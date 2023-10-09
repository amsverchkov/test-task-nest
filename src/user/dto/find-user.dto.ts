import { IsEmail, IsOptional } from 'class-validator';

export class FindUserDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsOptional()
	_id?: string;
}
