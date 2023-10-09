import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsString()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	surname: string;

	@IsStrongPassword(null, {
		message:
			'Email must contain at least 8 characters consisting of capital letters' +
			'and lowercase Latin letters as well as specials characters',
	})
	@ApiProperty()
	password: string;
}
