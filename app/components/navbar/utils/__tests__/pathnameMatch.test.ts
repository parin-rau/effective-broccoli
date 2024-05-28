import { pathnameMatch } from "../pathnameMatch";

const target = "/targetpage";

test("currently on target page", () => {
	expect(pathnameMatch("/targetpage", target)).toBe(true);
});

test("not on target page", () => {
	expect(pathnameMatch("/", target)).toBe(false);
});
