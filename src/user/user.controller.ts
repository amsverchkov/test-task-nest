import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_EXISTS_ERROR } from './user.constants';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiOperation({ summary: 'Creates new user' })
	@ApiOkResponse({ status: 201, description: 'New user has been created' })
	@ApiBadRequestResponse({
		status: 400 | 500,
	})
	async createUser(@Body() dto: CreateUserDto) {
		const isUserInDb = await this.userService.findUser({ email: dto.email });
		if (isUserInDb) {
			throw new BadRequestException(USER_EXISTS_ERROR);
		}
		return this.userService.createUser(dto);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Search of user by id' })
	@ApiOkResponse({ status: 200, description: 'Returns user by id' })
	@ApiBadRequestResponse({
		status: 500 | 404,
	})
	async findUserById(@Param('id') id: string) {
		return await this.userService.findUser({ _id: id });
	}

	@Get()
	@ApiOperation({ summary: 'Find all users' })
	@ApiOkResponse({ status: 200, description: 'Returns all users' })
	@ApiBadRequestResponse({
		status: 500 | 404,
	})
	async findAll() {
		return await this.userService.findAll();
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Deletes user by id' })
	@ApiOkResponse({ status: 200, description: 'Returns deleted user' })
	@ApiBadRequestResponse({
		status: 500,
	})
	async deleteUser(@Param('id') id: string) {
		return await this.userService.deleteUser({ _id: id });
	}

	@Put(':id')
	@ApiOkResponse({ status: 200, description: 'Returns updated user' })
	@ApiBadRequestResponse({
		status: 500,
	})
	async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return await this.userService.updateUser(id, dto);
	}
}
