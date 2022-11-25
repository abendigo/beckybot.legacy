import type { PageServerLoad } from './$types';
import { getContainer } from '../../../lib/ioc';

export const load: PageServerLoad = async (/* { params } */) => {
	const { getTeams } = getContainer().resolve('db');

	const teams = await getTeams();
	console.log({ teams });

	const data = Object.values(teams).map((next) => next.team);

	return {
		teams: data
	};
};
