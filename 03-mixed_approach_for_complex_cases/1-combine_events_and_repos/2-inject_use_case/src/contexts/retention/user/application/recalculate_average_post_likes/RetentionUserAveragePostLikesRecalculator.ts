import { UserId } from "../../../../rrss/users/domain/UserId";
import { RetentionUserDoesNotExist } from "../../domain/RetentionUserDoesNotExist";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";

export class RetentionUserAveragePostLikesRecalculator {
	constructor(private readonly repository: RetentionUserRepository) {}

	async recalculate(id: string): Promise<void> {
		const user = await this.repository.search(new UserId(id));

		if (!user) {
			throw new RetentionUserDoesNotExist(id);
		}

		user.recalculateAveragePostLikes();

		await this.repository.save(user);
	}
}
