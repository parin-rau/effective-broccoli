import { progressPercent } from "../progressPercent";

// Normal use
test("should calculate percent: 0%", () => {
	expect(progressPercent(0, 1)).toBe("0%");
});
test("should calculate percent: 67%", () => {
	expect(progressPercent(2, 3)).toBe("67%");
});
test("should calculate percent: 100%", () => {
	expect(progressPercent(4, 4)).toBe("100%");
});

// Error handling
test("should handle 0/0 input values", () => {
	expect(progressPercent(0, 0)).toBe("0%");
});
test("should handle negative input values", () => {
	expect(progressPercent(-1, 3)).toBe("0%");
});
test("should handle completed count > total count", () => {
	expect(progressPercent(5, 2)).toBe("100%");
});
