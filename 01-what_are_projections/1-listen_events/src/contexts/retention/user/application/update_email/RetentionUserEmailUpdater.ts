import { UserId } from "../../../../rrss/users/domain/UserId";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";
import { RetentionUserDoesNotExist } from "./RetentionUserDoesNotExist";

export class RetentionUserEmailUpdater {
	constructor(private readonly repository: RetentionUserRepository) {}
	async update(id: string, email: string): Promise<void> {
		const user = await this.repository.search(new UserId(id));

		if (!user) {
			throw new RetentionUserDoesNotExist(id);
		}

		user.updateEmail(email);

		await this.repository.save(user);
	}
}
