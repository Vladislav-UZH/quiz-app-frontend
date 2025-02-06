export default function <T>(
  name: string = "current",
  handler: () => void = () => {},
  initial: T | null = null
) {
  const current = useState<T | null>(name, () => initial);

  function chooseCurrent(newItem: T) {
    current.value = newItem;
    handler();
  }

  function toggleCurrent(newItem: T) {
    if (current.value === newItem) {
      if (current.value !== newItem) {
        current.value = newItem;
        return;
      }
      current.value = null;

      handler();

      return;
    }
    current.value = newItem;
    handler();
  }

  function getIsCurrent(item: T): boolean {
    return current.value === item;
  }
  return { chooseCurrent, toggleCurrent, current, getIsCurrent };
}
