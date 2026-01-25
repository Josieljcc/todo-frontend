/**
 * Navigation utility
 * Provides a way to handle navigation from non-React contexts
 * This allows apiClient to use React Router navigation instead of window.location
 */

let navigateFunction: ((path: string) => void) | null = null;

/**
 * Set the navigation function (should be called from App component)
 */
export const setNavigate = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

/**
 * Navigate to a path using React Router if available, otherwise fallback to window.location
 */
export const navigateTo = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    // Fallback for cases where React Router is not available
    window.location.href = path;
  }
};
