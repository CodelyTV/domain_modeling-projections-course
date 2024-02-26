import { RecalculateRetentionUserAveragePostLikesOnPostLiked } from "../../../../../../src/contexts/retention/user/application/recalculate_average_post_likes/RecalculateRetentionUserAveragePostLikesOnPostLiked";
import { RetentionUserAveragePostLikesRecalculator } from "../../../../../../src/contexts/retention/user/application/recalculate_average_post_likes/RetentionUserAveragePostLikesRecalculator";
import { RetentionUserDoesNotExist } from "../../../../../../src/contexts/retention/user/domain/RetentionUserDoesNotExist";
import { PostPublishedDomainEventMother } from "../../../../rrss/posts/domain/PostPublishedDomainEventMother";
import { UserIdMother } from "../../../../rrss/users/domain/UserIdMother";
import { RetentionUserMother } from "../../domain/RetentionUserMother";
import { MockRetentionUserRepository } from "../../infrastructure/MockRetentionUserRepository";

describe("RecalculateRetentionUserAveragePostLikesOnPostLiked should", () => {
	const repository = new MockRetentionUserRepository();
	const subscriber = new RecalculateRetentionUserAveragePostLikesOnPostLiked(
		new RetentionUserAveragePostLikesRecalculator(repository),
	);

	it("throw an exception if the user does not exist", async () => {
		const event = PostPublishedDomainEventMother.create();
		const userId = UserIdMother.create(event.userId);

		repository.shouldSearchAndReturnNull(userId);

		await expect(subscriber.on(event)).rejects.toThrow(new RetentionUserDoesNotExist(event.userId));
	});

	it("recalculate average post likes for the first post like", async () => {
		const event = PostPublishedDomainEventMother.create();
		const existingUser = RetentionUserMother.create({
			id: event.userId,
			totalPosts: 1,
			averagePostLikes: 0,
		});

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
		const event = PostPublishedDomainEventMother.create();
		const existingUser = RetentionUserMother.create({
			id: event.userId,
			totalPosts: 10,
			averagePostLikes: 3,
		});

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
