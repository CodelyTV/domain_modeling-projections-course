import { Primitives } from "@codelytv/primitives-type";

export class PostLatestLike {
	constructor(
		public readonly id: string,
		public readonly userId: string,
		public readonly userName: string,
		public readonly profilePictureUrl: string,
		public readonly likedAt: Date,
	) {}

	static fromPrimitives(primitives: Primitives<PostLatestLike>): PostLatestLike {
		return new PostLatestLike(
			primitives.id as string,
			primitives.userId as string,
			primitives.userName as string,
			primitives.profilePictureUrl as string,
			primitives.likedAt as Date,
		);
	}

	toPrimitives(): Primitives<PostLatestLike> {
		return {
			id: this.id,
			userId: this.userId,
			userName: this.userName,
			profilePictureUrl: this.profilePictureUrl,
			likedAt: this.likedAt,
		};
	}
}
