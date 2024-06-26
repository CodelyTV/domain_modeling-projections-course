import { RecalculateRetentionUserAveragePostLikesOnPostLiked } from "../../../../../../src/contexts/retention/users/application/recalculate_average_post_likes/RecalculateRetentionUserAveragePostLikesOnPostLiked";
import { RetentionUserAveragePostLikesRecalculator } from "../../../../../../src/contexts/retention/users/application/recalculate_average_post_likes/RetentionUserAveragePostLikesRecalculator";
import { RetentionUserDoesNotExist } from "../../../../../../src/contexts/retention/users/domain/RetentionUserDoesNotExist";
import { PostLikedDomainEventMother } from "../../../../rrss/post_likes/domain/PostLikedDomainEventMother";
import { UserIdMother } from "../../../../rrss/users/domain/UserIdMother";
import { RetentionUserMother } from "../../domain/RetentionUserMother";
import { MockRetentionUserRepository } from "../../infrastructure/MockRetentionUserRepository";

describe("RecalculateRetentionUserAveragePostLikesOnPostLiked should", () => {
	const repository = new MockRetentionUserRepository();
	const subscriber = new RecalculateRetentionUserAveragePostLikesOnPostLiked(
		new RetentionUserAveragePostLikesRecalculator(repository),
	);

	it("throw an exception if the user does not exist", async () => {
		const event = PostLikedDomainEventMother.create();
		const userId = UserIdMother.create(event.postUserId);

		repository.shouldSearchAndReturnNull(userId);

		await expect(subscriber.on(event)).rejects.toThrow(
			new RetentionUserDoesNotExist(event.postUserId),
		);
	});

	it("recalculate average post likes for the first post like", async () => {
		const event = PostLikedDomainEventMother.create();
		const existingUser = RetentionUserMother.create({
			id: event.postUserId,
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
		const event = PostLikedDomainEventMother.create();
		const existingUser = RetentionUserMother.create({
			id: event.postUserId,
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
