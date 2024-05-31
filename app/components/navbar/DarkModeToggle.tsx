import { useState } from "react";
import TransparentButton from "../ui/TransparentButton";
import Moon from "~/assets/Moon";
import Sun from "~/assets/Sun";

export default function DarkModeToggle() {
	const [theme, setTheme] = useState<string>(localStorage.theme);

	const handleThemeToggle = () => {
		//theme === "dark" ? setTheme("light") : setTheme("dark");
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

	return (
		<TransparentButton onClick={handleThemeToggle}>
			<div className="w-fit">{theme === "dark" ? <Moon /> : <Sun />}</div>
		</TransparentButton>
	);
}
