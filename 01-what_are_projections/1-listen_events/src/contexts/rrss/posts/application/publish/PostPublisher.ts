import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";

export class PostPublisher {
	constructor(
		private readonly repository: PostRepository,
		private readonly eventBus: EventBus,
	) {}

	async registrar(id: string, content: string): Promise<void> {
		const post = Post.publish(id, content);

		await this.repository.save(post);
		await this.eventBus.publish(post.pullDomainEvents());
	}
}
