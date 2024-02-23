import { DomainEvent, DomainEventAttributes } from "../../../shared/domain/event/DomainEvent";

export class PostPublishedDomainEvent extends DomainEvent {
	static eventName = "codely.rrss.post.published";

	constructor(
		public readonly id: string,
		public readonly content: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		super(PostPublishedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): PostPublishedDomainEvent {
		return new PostPublishedDomainEvent(
			aggregateId,
			attributes.content as string,
			eventId,
			occurredOn,
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			content: this.content,
		};
	}
}
