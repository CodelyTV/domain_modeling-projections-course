import { Primitives } from "@codelytv/primitives-type";

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Clock } from "../../../shared/domain/Clock";
import { UserId } from "../../users/domain/UserId";
import { PostContent } from "./PostContent";
import { PostId } from "./PostId";
import { PostLikes } from "./PostLikes";
import { PostLikesIncrementedDomainEvent } from "./PostLikesIncrementedDomainEvent";
import { PostPublishedDomainEvent } from "./PostPublishedDomainEvent";

export class Post extends AggregateRoot {
	private constructor(
		public readonly id: PostId,
		public readonly userId: UserId,
		public readonly content: PostContent,
		public likes: PostLikes,
		public readonly createdAt: Date,
	) {
		super();
	}

	static publish(id: string, userId: string, content: string, clock: Clock): Post {
		const post = new Post(
			new PostId(id),
			new UserId(userId),
			new PostContent(content),
			PostLikes.init(),
			clock.now(),
		);

		post.record(new PostPublishedDomainEvent(id, userId, content));

		return post;
	}

	static fromPrimitives(primitives: Primitives<Post>): Post {
		return new Post(
			new PostId(primitives.id),
			new UserId(primitives.userId),
			new PostContent(primitives.content),
			new PostLikes(primitives.likes),
			primitives.createdAt as Date,
		);
	}

	toPrimitives(): Primitives<Post> {
		return {
			id: this.id.value,
			userId: this.userId.value,
			content: this.content.value,
			likes: this.likes.value,
			createdAt: this.createdAt,
		};
	}

	incrementLikes(): void {
		this.likes = this.likes.increment();

		this.record(new PostLikesIncrementedDomainEvent(this.id.value, this.likes.value));
	}
}
