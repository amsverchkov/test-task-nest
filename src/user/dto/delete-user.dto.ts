import { IsString } from 'class-validator';

export class DeleteUserDto {
	@IsString()
	_id: string;
}
