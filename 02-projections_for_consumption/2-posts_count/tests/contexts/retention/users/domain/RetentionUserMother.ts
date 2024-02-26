import { faker } from "@faker-js/faker";

import {
	RetentionUser,
	RetentionUserPrimitives,
} from "../../../../../src/contexts/retention/users/domain/RetentionUser";
import { UserIdMother } from "../../../rrss/users/domain/UserIdMother";

export class RetentionUserMother {
	static create(params?: Partial<RetentionUserPrimitives>): RetentionUser {
		const primitives: RetentionUserPrimitives = {
			id: UserIdMother.create().value,
			email: faker.internet.email(),
			name: faker.person.fullName(),
			...params,
		};

		return RetentionUser.fromPrimitives(primitives);
	}
}
