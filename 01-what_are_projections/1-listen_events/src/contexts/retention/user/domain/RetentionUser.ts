import { UserId } from "../../../rrss/users/domain/UserId";

export type RetentionUserPrimitives = {
	id: string;
	email: string;
	name: string;
};

export class RetentionUser {
	constructor(
		public readonly id: UserId,
		public readonly email: string,
		public readonly name: string,
	) {}

	static create(id: string, email: string, name: string): RetentionUser {
		return new RetentionUser(new UserId(id), email, name);
	}

	static fromPrimitives(primitives: RetentionUserPrimitives): RetentionUser {
		return new RetentionUser(new UserId(primitives.id), primitives.email, primitives.name);
	}

	toPrimitives(): RetentionUserPrimitives {
		return {
			id: this.id.value,
			email: this.email,
			name: this.name,
		};
	}
}
