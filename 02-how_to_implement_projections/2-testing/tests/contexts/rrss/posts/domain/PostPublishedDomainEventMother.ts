import { Primitives } from "@codelytv/primitives-type";

import { Post } from "../../../../../src/contexts/rrss/posts/domain/Post";
import { PostPublishedDomainEvent } from "../../../../../src/contexts/rrss/posts/domain/PostPublishedDomainEvent";
import { PostContentMother } from "./PostContentMother";
import { PostIdMother } from "./PostIdMother";

export class PostPublishedDomainEventMother {
	static create(params?: Partial<Primitives<Post>>): PostPublishedDomainEvent {
		const primitives: Primitives<Post> = {
			id: PostIdMother.create().value,
			content: PostContentMother.create().value,
			createdAt: new Date(),
			...params,
		};

		return new PostPublishedDomainEvent(primitives.id, primitives.content);
	}
}
