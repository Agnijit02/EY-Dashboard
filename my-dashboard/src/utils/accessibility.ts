export const KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  TAB: 'Tab',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
} as const;

export function handleKeyboardClick(
  event: React.KeyboardEvent,
  handler: () => void,
) {
  if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
    event.preventDefault();
    handler();
  }
}
