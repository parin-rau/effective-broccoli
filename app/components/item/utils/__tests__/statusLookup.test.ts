import { getStatus } from "../statusLookup";

test('status should be "not started"', () => {
	expect(getStatus(2)).toBe("Not Started");
});

test("status should be Completed", () => {
	expect(getStatus(4)).toBe("Completed");
});
