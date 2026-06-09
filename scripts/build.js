import { spawnSync } from "node:child_process";

const validThemes = new Set(["blue", "green"]);

function getTheme(args) {
  const themeIndex = args.findIndex((arg) => arg === "--theme");
  const theme = themeIndex >= 0 ? args[themeIndex + 1] : "blue";

  if (!validThemes.has(theme)) {
    console.error("Tema invalido. Use: npm run build -- --theme blue");
    console.error("Ou: npm run build -- --theme green");
    process.exit(1);
  }

  return theme;
}

const theme = getTheme(process.argv.slice(2));

const result = spawnSync("vite", ["build"], {
  env: {
    ...process.env,
    VITE_WELCOME_THEME: theme,
  },
  shell: true,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
