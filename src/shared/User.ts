import { Entity, Fields, Validators } from 'remult';

@Entity('users', {
	allowApiCrud: true
})
export class User {
	@Fields.autoIncrement()
	id!: number;

	@Fields.string({
		validate: Validators.required
	})
	name: string = '';

	@Fields.string({
		validate: Validators.email
	})
	email: string = '';

	@Fields.string({ includeInApi: false })
	password: string = '';

	@Fields.string<User>({
		serverExpression: () => '***',
		saving: async (user, fieldRef) => {
			if (fieldRef.valueChanged()) {
				user.password = await User.hash(user.updatePassword);
			}
		}
	})
	updatePassword: string = '';

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;

	static hash = async (password: string) => password;
}
