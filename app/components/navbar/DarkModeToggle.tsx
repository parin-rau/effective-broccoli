import { useState } from "react";
import TransparentButton from "../ui/TransparentButton";
import Moon from "~/assets/Moon";
import Sun from "~/assets/Sun";

class Theme {
	theme: string | null;

	constructor() {
		if (typeof window !== "object") {
			this.theme = null;
		} else if (localStorage.theme) {
			this.theme = localStorage.theme;
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			this.theme = "dark";
		} else {
			this.theme = "light";
		}
	}
}

const toggleTheme = (
	theme: string | null,
	setTheme: React.Dispatch<React.SetStateAction<string | null>>
) => {
	if (typeof window !== "object") {
		return null;
	}

	if (theme === "dark") {
		document.documentElement.classList.remove("dark");
		localStorage.theme = "light";
		setTheme("light");
	} else {
		document.documentElement.classList.add("dark");
		localStorage.theme = "dark";
		setTheme("dark");
	}
};

const initTheme = new Theme().theme;

export default function DarkModeToggle() {
	const [theme, setTheme] = useState<string | null>(initTheme);

	return (
		<TransparentButton
			fullWidth
			onClick={() => toggleTheme(theme, setTheme)}
		>
			<div className="w-fit">{theme === "dark" ? <Moon /> : <Sun />}</div>
		</TransparentButton>
	);
}
