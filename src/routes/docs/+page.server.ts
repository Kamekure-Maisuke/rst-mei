import { _openApiDoc } from '../api/[...remult]/+server';

export const load = async () => {
	return {
		apiDoc: _openApiDoc
	};
};
