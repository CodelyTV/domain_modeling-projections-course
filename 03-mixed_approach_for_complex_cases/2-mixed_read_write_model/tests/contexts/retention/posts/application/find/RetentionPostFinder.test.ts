import { RetentionPostFinder } from "../../../../../../src/contexts/retention/posts/application/find/RetentionPostFinder";
import { RetentionPostDoesNotExist } from "../../../../../../src/contexts/retention/posts/domain/RetentionPostDoesNotExist";
import { PostIdMother } from "../../../../rrss/posts/domain/PostIdMother";
import { PostMother } from "../../../../rrss/posts/domain/PostMother";
import { MockRetentionPostRepository } from "../../infrastructure/MockRetentionPostRepository";

describe("RetentionPostFinder should", () => {
	const repository = new MockRetentionPostRepository();
	const finder = new RetentionPostFinder(repository);

	it("throw an exception if the post does not exist", async () => {
		const id = PostIdMother.create();

		repository.shouldSearchAndReturnNull(id);

		await expect(finder.find(id.value)).rejects.toThrow(new RetentionPostDoesNotExist(id.value));
	});

	it("return an existing post", async () => {
		const post = PostMother.create();

		repository.shouldSearch(post);

		expect(await finder.find(post.id.value)).toBe(post);
	});
});
