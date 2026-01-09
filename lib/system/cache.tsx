
export default function SetSystemThemeCache(theme: string) {
  try {
    localStorage.setItem('system-theme', theme);
  } catch (error) {
    console.error('Error setting system theme in cache:', error);
  }
}