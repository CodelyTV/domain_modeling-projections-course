import { Primitives } from "@codelytv/primitives-type";

import { Post } from "../../../../../src/contexts/rrss/posts/domain/Post";
import { PostContentMother } from "./PostContentMother";
import { PostIdMother } from "./PostIdMother";

export class PostMother {
	static create(params?: Partial<Primitives<Post>>): Post {
		const primitives: Primitives<Post> = {
			id: PostIdMother.create().value,
			content: PostContentMother.create().value,
			createdAt: new Date(),
			...params,
		};

		return Post.fromPrimitives(primitives);
	}
}
