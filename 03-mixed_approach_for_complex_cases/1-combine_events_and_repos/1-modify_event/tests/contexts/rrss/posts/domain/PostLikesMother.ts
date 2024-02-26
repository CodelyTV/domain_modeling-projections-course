import { faker } from "@faker-js/faker";

import { PostLikes } from "../../../../../src/contexts/rrss/posts/domain/PostLikes";

export class PostLikesMother {
	static create(value?: number): PostLikes {
		return new PostLikes(value ?? faker.number.int({ min: 0, max: 10000000 }));
	}
}
