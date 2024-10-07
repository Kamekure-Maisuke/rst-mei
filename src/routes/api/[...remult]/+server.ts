import { remultSveltekit } from 'remult/remult-sveltekit';
import { User } from '../../../shared/User';
import { Article } from '../../../shared/Article';
import { Category } from '../../../shared/Category';
import { hash } from 'bcrypt';

export const _api = remultSveltekit({
	entities: [User, Article, Category]
});

export const _openApiDoc = _api.openApiDoc({
	title: 'RST-MEI'
});

export const { GET, POST, PUT, DELETE } = _api;

User.hash = (password) => hash(password, 10);
