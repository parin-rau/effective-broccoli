import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
	userId: string;
};

type SessionFlashData = {
	error: string;
};

export const sessionStorage = createCookieSessionStorage<
	SessionData,
	SessionFlashData
>({
	cookie: {
		name: "__session",
		sameSite: "lax",
		path: "/",
		httpOnly: true,
		secrets: [""],
		secure: process.env.NODE_ENV === "production",
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
