import { promptForNewName } from './prompt';

describe('prompt service', () => {
  const originalPrompt = window.prompt;

  beforeEach(() => {
    window.prompt = jest.fn();
  });

  afterEach(() => {
    window.prompt = originalPrompt;
  });

  it('should call window.prompt with correct parameters', () => {
    const mockPrompt = jest.fn().mockReturnValue('New Name');
    window.prompt = mockPrompt;

    const result = promptForNewName('Old Name');

    expect(mockPrompt).toHaveBeenCalledWith('Enter new name:', 'Old Name');
    expect(result).toBe('New Name');
  });

  it('should handle user cancellation', () => {
    const mockPrompt = jest.fn().mockReturnValue(null);
    window.prompt = mockPrompt;

    const result = promptForNewName('Old Name');

    expect(mockPrompt).toHaveBeenCalledWith('Enter new name:', 'Old Name');
    expect(result).toBeNull();
  });
}); 