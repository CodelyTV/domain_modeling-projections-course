import { PostPublisher } from "../../../../../../src/contexts/rrss/posts/application/publish/PostPublisher";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { PostMother } from "../../domain/PostMother";
import { PostPublishedDomainEventMother } from "../../domain/PostPublishedDomainEventMother";
import { MockPostRepository } from "../../infrastructure/MockPostRepository";

describe("PostPublisher should", () => {
	const repository = new MockPostRepository();
	const eventBus = new MockEventBus();
	const postPublisher = new PostPublisher(repository, eventBus);

	it("publish a valid post", async () => {
		const expectedPost = PostMother.create();
		const expectedPostPrimitives = expectedPost.toPrimitives();

		const expectedDomainEvent = PostPublishedDomainEventMother.create(expectedPostPrimitives);

		repository.shouldSave(expectedPost);
		eventBus.shouldPublish([expectedDomainEvent]);

		await postPublisher.publish(expectedPostPrimitives.id, expectedPostPrimitives.content);
	});
});
