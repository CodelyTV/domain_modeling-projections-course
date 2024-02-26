import { PostFinder } from "../../../../rrss/posts/application/find/PostFinder";
import { RetentionUserDoesNotExist } from "../../domain/RetentionUserDoesNotExist";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";

export class RetentionUserAveragePostLikesRecalculator {
	constructor(
		private readonly finder: PostFinder,
		private readonly repository: RetentionUserRepository,
	) {}

	async recalculate(postId: string): Promise<void> {
		const post = await this.finder.find(postId);
		const user = await this.repository.search(post.userId);

		if (!user) {
			throw new RetentionUserDoesNotExist(post.userId.value);
		}

		user.recalculateAveragePostLikes();

		await this.repository.save(user);
	}
}
