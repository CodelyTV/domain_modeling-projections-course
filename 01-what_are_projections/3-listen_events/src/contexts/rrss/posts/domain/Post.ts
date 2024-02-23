import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { PostContent } from "./PostContent";
import { PostId } from "./PostId";
import { PostPublishedDomainEvent } from "./PostPublishedDomainEvent";

export class Post extends AggregateRoot {
	private constructor(
		public readonly id: PostId,
		private readonly content: PostContent,
		private readonly createdAt: Date,
	) {
		super();
	}

	static publish(id: string, content: string): Post {
		const post = new Post(new PostId(id), new PostContent(content), new Date());

		post.record(new PostPublishedDomainEvent(id, content));

		return post;
	}
}
