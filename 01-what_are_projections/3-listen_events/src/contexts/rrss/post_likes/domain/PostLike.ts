import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { PostId } from "../../posts/domain/PostId";
import { UserId } from "../../users/domain/UserId";
import { PostLikedDomainEvent } from "./PostLikedDomainEvent";
import { PostLikeId } from "./PostLikeId";

export class PostLike extends AggregateRoot {
	private constructor(
		public readonly id: PostLikeId,
		private readonly postId: PostLikeId,
		private readonly userId: UserId,
		private readonly likedAt: Date,
	) {
		super();
	}

	static like(id: string, postId: string, userId: string): PostLike {
		const post = new PostLike(
			new UserId(userId),
			new PostLikeId(id),
			new PostId(postId),
			new Date(),
		);

		post.record(new PostLikedDomainEvent(id, postId, userId));

		return post;
	}
}
