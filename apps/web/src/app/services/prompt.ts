export const promptForNewName = (currentName: string): string | null => {
  return window.prompt('Enter new name:', currentName);
};
