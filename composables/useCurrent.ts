export default function <T>(
  name: string = "current",
  handler: () => void = () => {}
) {
  const current = useState<T | null>(name);

  function chooseCurrent(newItem: T) {
    current.value = newItem;
    handler();
  }

  function toggleCurrent(newItem: T) {
    if (current.value) {
      current.value = null;

      if (current.value !== newItem) {
        current.value = newItem;
      }
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
