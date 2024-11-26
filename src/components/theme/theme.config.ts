import { colorsTuple, createTheme, virtualColor } from "@mantine/core";

const theme = createTheme({
	cursorType: "pointer",
	colors: {
		darkPrimary: colorsTuple("#111111"),
		darkSecondary: colorsTuple("#1C1C1C"),
		darkCard: colorsTuple("#232323"),
		lightPrimary: colorsTuple("#F5F4F4"),
		lightSecondary: colorsTuple("#FFFFFF"),
		lightCard: colorsTuple("#FFFFFF"),
		primary: virtualColor({
			name: "primary",
			dark: "darkPrimary",
			light: "lightPrimary",
		}),
		secondary: virtualColor({
			name: "secondary",
			dark: "darkSecondary",
			light: "lightSecondary",
		}),
		card: virtualColor({
			name: "card",
			dark: "darkCard",
			light: "lightCard",
		}),
	},
	fontFamily: "Happy Monkey, sans-serif",
});

export default theme;
