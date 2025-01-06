const STORAGE_KEY = 'theme';
const SYSTEM_THEME = 'system';

export type Theme = 'dark' | 'light' | 'system';

const getTheme = () : Theme => {
    return document.documentElement.getAttribute('data-theme') as Theme || SYSTEM_THEME;
};

const setTheme = (theme: Theme, save: boolean = true) => {
  if (theme === SYSTEM_THEME) {
    document.documentElement.removeAttribute('data-theme');
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }
  updateThemeUI(theme);
};

const updateThemeUI = (theme: Theme) => {
  const themeCycle = document.getElementById('theme-switch');
  let appliedTheme = theme;

  if (theme === SYSTEM_THEME) {
    appliedTheme = getSystemTheme();
  }
};

const switchTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || SYSTEM_THEME;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

const getSystemTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const initTheme = () => {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme || SYSTEM_THEME;
  const themeToApply = savedTheme === SYSTEM_THEME ? getSystemTheme() : savedTheme;
  setTheme(themeToApply, false);
};

document.addEventListener('DOMContentLoaded', initTheme);

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const theme = event.matches ? "dark" : "light";
      setTheme(theme);
    });

export { setTheme, getTheme, getSystemTheme, switchTheme, initTheme };