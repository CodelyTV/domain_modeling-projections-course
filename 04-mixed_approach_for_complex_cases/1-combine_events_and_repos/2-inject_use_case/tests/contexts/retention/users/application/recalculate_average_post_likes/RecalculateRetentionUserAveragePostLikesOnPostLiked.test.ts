import { RecalculateRetentionUserAveragePostLikesOnPostLiked } from "../../../../../../src/contexts/retention/users/application/recalculate_average_post_likes/RecalculateRetentionUserAveragePostLikesOnPostLiked";
import { RetentionUserAveragePostLikesRecalculator } from "../../../../../../src/contexts/retention/users/application/recalculate_average_post_likes/RetentionUserAveragePostLikesRecalculator";
import { RetentionUserDoesNotExist } from "../../../../../../src/contexts/retention/users/domain/RetentionUserDoesNotExist";
import { PostFinder } from "../../../../../../src/contexts/rrss/posts/application/find/PostFinder";
import { PostLikedDomainEventMother } from "../../../../rrss/post_likes/domain/PostLikedDomainEventMother";
import { PostMother } from "../../../../rrss/posts/domain/PostMother";
import { MockPostRepository } from "../../../../rrss/posts/infrastructure/MockPostRepository";
import { RetentionUserMother } from "../../domain/RetentionUserMother";
import { MockRetentionUserRepository } from "../../infrastructure/MockRetentionUserRepository";

describe("RecalculateRetentionUserAveragePostLikesOnPostLiked should", () => {
	const postRepository = new MockPostRepository();
	const repository = new MockRetentionUserRepository();
	const subscriber = new RecalculateRetentionUserAveragePostLikesOnPostLiked(
		new RetentionUserAveragePostLikesRecalculator(new PostFinder(postRepository), repository),
	);

	it("throw an exception if the user does not exist", async () => {
		const event = PostLikedDomainEventMother.create();
		const post = PostMother.create({ id: event.postId });

		postRepository.shouldSearch(post);
		repository.shouldSearchAndReturnNull(post.userId);

		await expect(subscriber.on(event)).rejects.toThrow(
			new RetentionUserDoesNotExist(post.userId.value),
		);
	});

	it("recalculate average post likes for the first post like", async () => {
		const event = PostLikedDomainEventMother.create();
		const post = PostMother.create({ id: event.postId });

		const existingUser = RetentionUserMother.create({
			id: post.userId.value,
			totalPosts: 1,
			averagePostLikes: 0,
		});

		postRepository.shouldSearch(post);
		repository.shouldSearch(existingUser);
		repository.shouldSave(
			RetentionUserMother.create({
				...existingUser.toPrimitives(),
				averagePostLikes: 1,
			}),
		);

		await subscriber.on(event);
	});

	it("recalculate average post likes", async () => {
		const event = PostLikedDomainEventMother.create();
		const post = PostMother.create({ id: event.postId });

		const existingUser = RetentionUserMother.create({
			id: post.userId.value,
			totalPosts: 10,
			averagePostLikes: 3,
		});

		postRepository.shouldSearch(post);
		repository.shouldSearch(existingUser);
		repository.shouldSave(
			RetentionUserMother.create({
				...existingUser.toPrimitives(),
				averagePostLikes: 3.1,
			}),
		);

		await subscriber.on(event);
	});
});
