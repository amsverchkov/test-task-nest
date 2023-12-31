import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				schema: UserSchema,
				name: UserModel.name,
			},
		]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
