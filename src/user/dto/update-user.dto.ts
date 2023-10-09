import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsEmail()
	@ApiProperty()
	email?: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	name?: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	surname?: string;

	@IsOptional()
	@IsStrongPassword(null, {
		message:
			'Email must contain at least 8 characters consisting of capital letters' +
			'and lowercase Latin letters as well as specials characters',
	})
	@ApiProperty()
	password?: string;
}
