import { Primitives } from "@codelytv/primitives-type";

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { PostContent } from "./PostContent";
import { PostId } from "./PostId";
import { PostPublishedDomainEvent } from "./PostPublishedDomainEvent";

export class Post extends AggregateRoot {
	private constructor(
		public readonly id: PostId,
		public readonly content: PostContent,
		public readonly createdAt: Date,
	) {
		super();
	}

	static publish(id: string, content: string): Post {
		const post = new Post(new PostId(id), new PostContent(content), new Date());

		post.record(new PostPublishedDomainEvent(id, content));

		return post;
	}

	static fromPrimitives(primitives: Primitives<Post>): Post {
		return new Post(
			new PostId(primitives.id),
			new PostContent(primitives.content),
			primitives.createdAt as Date,
		);
	}

	toPrimitives(): Primitives<Post> {
		return {
			id: this.id.value,
			content: this.content.value,
			createdAt: this.createdAt,
		};
	}
}
