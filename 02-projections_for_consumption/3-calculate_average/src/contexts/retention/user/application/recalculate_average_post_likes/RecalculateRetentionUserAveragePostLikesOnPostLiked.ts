import { PostPublishedDomainEvent } from "../../../../rrss/posts/domain/PostPublishedDomainEvent";
import { UserDomainEvent } from "../../../../rrss/users/domain/UserDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { RetentionUserAveragePostLikesRecalculator } from "./RetentionUserAveragePostLikesRecalculator";

export class RecalculateRetentionUserAveragePostLikesOnPostLiked
	implements DomainEventSubscriber<UserDomainEvent>
{
	constructor(private readonly recalculator: RetentionUserAveragePostLikesRecalculator) {}

	async on(event: PostPublishedDomainEvent): Promise<void> {
		await this.recalculator.recalculate(event.userId);
	}

	subscribedTo(): DomainEventClass[] {
		return [PostPublishedDomainEvent];
	}

	name(): string {
		return "codely.retention.recalculate_retention_user_average_post_likes_on_post_liked";
	}
}
