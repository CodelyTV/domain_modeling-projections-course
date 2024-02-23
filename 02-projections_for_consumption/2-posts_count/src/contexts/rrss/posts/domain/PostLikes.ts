import { NumberValueObject } from "../../../shared/domain/NumberValueObject";

export class PostLikes extends NumberValueObject {
	static init(): PostLikes {
		return new PostLikes(0);
	}
}
