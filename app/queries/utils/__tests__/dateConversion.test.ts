import { toTimestampString } from "../../../../queries/utils/dateConversion";

// Simulated current time for comparisons
const referenceDate = new Date("01 January 2024 12:00 UTC");

test("timestamp string 'Just now'", () => {
	expect(
		toTimestampString(
			new Date("1 January 2024 11:59:10 UTC"),
			referenceDate
		)
	).toBe("Just now");
});

test("timestamp string '10 minutes ago'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2024 11:50:00 UTC"),
			referenceDate
		)
	).toBe("10 minutes ago");
});

test("timestamp string '3 hours ago'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2024 09:00:00 UTC"),
			referenceDate
		)
	).toBe("3 hours ago");
});

test("timestamp string '10 days ago'", () => {
	expect(
		toTimestampString(
			new Date("22 December 2023 00:00:00 UTC"),
			referenceDate
		)
	).toBe("10 days ago");
});

test("timestamp string '3 months ago'", () => {
	expect(
		toTimestampString(
			new Date("01 October 2023 03:00:00 UTC"),
			referenceDate
		)
	).toBe("3 months ago");
});

test("timestamp string '3 years ago'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2021 03:00:00 UTC"),
			referenceDate
		)
	).toBe("3 years ago");
});

test("timestamp string, '5 months ago', numerical unix timestamp as input", () => {
	expect(toTimestampString(1690873200000, referenceDate)).toBe(
		"5 months ago"
	);
});
