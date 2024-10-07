import { Entity, Fields, Relations, Validators } from 'remult';
import { User } from './User';
import { Category } from './Category';

@Entity('articles', {
	allowApiCrud: true
})
export class Article {
	@Fields.autoIncrement()
	id!: number;

	@Relations.toOne(() => User)
	user?: User;

	@Relations.toOne(() => Category)
	category?: Category;

	@Fields.string({
		validate: Validators.required
	})
	title: string = '';

	@Fields.string({
		validate: Validators.required
	})
	content: string = '';

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;
}
