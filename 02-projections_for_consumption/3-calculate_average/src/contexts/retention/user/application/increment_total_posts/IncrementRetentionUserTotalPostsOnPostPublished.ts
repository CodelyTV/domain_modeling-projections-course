import { PostPublishedDomainEvent } from "../../../../rrss/posts/domain/PostPublishedDomainEvent";
import { UserDomainEvent } from "../../../../rrss/users/domain/UserDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PostLikesIncrementer } from "./PostLikesIncrementer";

export class IncrementRetentionUserTotalPostsOnPostPublished
	implements DomainEventSubscriber<UserDomainEvent>
{
	constructor(private readonly incrementer: PostLikesIncrementer) {}

	async on(event: PostPublishedDomainEvent): Promise<void> {
		await this.incrementer.increment(event.postId);
	}

	subscribedTo(): DomainEventClass[] {
		return [PostPublishedDomainEvent];
	}

	name(): string {
		return "codely.retention.create_retention_user_on_user_registered";
	}
}
