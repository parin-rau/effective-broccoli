import { getTaskStatus } from "../statusLookup";

test('status should be "not started"', () => {
	expect(getTaskStatus(2)).toBe("Not Started");
});

test("status should be Completed", () => {
	expect(getTaskStatus(4)).toBe("Completed");
});
