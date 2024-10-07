import { Entity, Fields, Validators } from 'remult';

@Entity('categories', {
	allowApiCrud: true
})
export class Category {
	@Fields.autoIncrement()
	id!: number;

	@Fields.string({
		validate: Validators.required
	})
	name: string = '';

	@Fields.string({
		validate: Validators.required
	})
	description: string = '';
}
