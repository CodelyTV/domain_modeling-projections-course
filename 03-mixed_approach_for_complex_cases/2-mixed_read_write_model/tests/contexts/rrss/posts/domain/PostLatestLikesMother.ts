import { Primitives } from "@codelytv/primitives-type";

import { PostLatestLike } from "../../../../../src/contexts/rrss/posts/domain/PostLatestLike";
import { PostLatestLikes } from "../../../../../src/contexts/rrss/posts/domain/PostLatestLikes";

export class PostLatestLikesMother {
	static create(latestLikes: Primitives<PostLatestLike>[]): PostLatestLikes {
		return PostLatestLikes.fromPrimitives({ latestLikes });
	}

	static empty(): PostLatestLikes {
		return PostLatestLikes.fromPrimitives({ latestLikes: [] });
	}
}
