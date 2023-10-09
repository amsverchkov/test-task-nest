import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel.name) private userModel: Model<UserDocument>,
		private readonly configService: ConfigService,
	) {}

	async findUser(dto: FindUserDto): Promise<UserModel | null> {
		return this.userModel.findOne(dto).exec();
	}

	async deleteUser(dto: DeleteUserDto): Promise<UserModel[] | null> {
		return this.userModel.findByIdAndDelete(dto);
	}

	async findAll(): Promise<UserModel[] | null> {
		return this.userModel.find().exec();
	}

	async createUser(dto: CreateUserDto) {
		const password = await this.createPassword(dto.password);
		const newUser = new this.userModel({
			email: dto.email,
			name: dto.name,
			passwordHash: password,
			surname: dto.surname,
		});
		return newUser.save();
	}

	async updateUser(id: string, dto: UpdateUserDto): Promise<UserModel | null> {
		const updateData = { ...dto, passwordHash: await this.createPassword(dto.password) };
		delete updateData['passsword'];
		return this.userModel
			.findByIdAndUpdate(id, updateData)
			.setOptions({ overwrite: true, new: true })
			.exec();
	}

	private async createPassword(password: string) {
		const salt = await genSalt(parseInt(this.configService.get('SALT')));
		return await hash(password, salt);
	}
}
