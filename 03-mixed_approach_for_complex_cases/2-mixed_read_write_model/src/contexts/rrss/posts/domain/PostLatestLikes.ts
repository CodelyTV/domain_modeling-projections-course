import { Primitives } from "@codelytv/primitives-type";

import { PostLatestLike } from "./PostLatestLike";

export class PostLatestLikes {
	constructor(public readonly latestLikes: PostLatestLike[]) {}

	static init(): PostLatestLikes {
		return new PostLatestLikes([]);
	}

	static fromPrimitives(latestLikes: Primitives<PostLatestLikes>): PostLatestLikes {
		return new PostLatestLikes(
			latestLikes.latestLikes.map((postLatestLike) =>
				PostLatestLike.fromPrimitives(postLatestLike),
			),
		);
	}

	toPrimitives(): Primitives<PostLatestLikes> {
		return {
			latestLikes: this.latestLikes.map((postLatestLike) => postLatestLike.toPrimitives()),
		};
	}
}
