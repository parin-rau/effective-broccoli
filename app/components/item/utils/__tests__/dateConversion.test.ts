import { toTimestampString } from "../dateConversion";

const referenceDate = new Date("01 January 2024 00:00 UTC");

test("timestamp string 'Just now'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2024 00:00:10 UTC"),
			referenceDate
		)
	).toBe("Just now");
});

test("timestamp string '10 minutes ago'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2024 00:10:00 UTC"),
			referenceDate
		)
	).toBe("10 minutes ago");
});

test("timestamp string '3 hours ago'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2024 03:00:00 UTC"),
			referenceDate
		)
	).toBe("3 hours ago");
});

test("timestamp string '10 days ago'", () => {
	expect(
		toTimestampString(
			new Date("11 January 2024 00:00:00 UTC"),
			referenceDate
		)
	).toBe("10 days ago");
});

test("timestamp string '3 months ago'", () => {
	expect(
		toTimestampString(new Date("01 April 2024 03:00:00 UTC"), referenceDate)
	).toBe("3 months ago");
});

test("timestamp string '3 years ago'", () => {
	expect(
		toTimestampString(
			new Date("01 January 2027 03:00:00 UTC"),
			referenceDate
		)
	).toBe("3 years ago");
});
