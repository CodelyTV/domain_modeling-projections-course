import { UserDomainEvent } from "../../../../rrss/users/domain/UserDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PostLikedDomainEvent } from "../../../post_likes/domain/PostLikedDomainEvent";
import { PostLikesIncrementer } from "./PostLikesIncrementer";

export class IncrementPostLikesOnPostLiked implements DomainEventSubscriber<UserDomainEvent> {
	constructor(private readonly incrementer: PostLikesIncrementer) {}

	async on(event: PostLikedDomainEvent): Promise<void> {
		await this.incrementer.increment(event.postId);
	}

	subscribedTo(): DomainEventClass[] {
		return [PostLikedDomainEvent];
	}

	name(): string {
		return "codely.retention.create_retention_user_on_user_registered";
	}
}
