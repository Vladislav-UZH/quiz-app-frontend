export default function () {
  const current = useState("current", () => "");

  function chooseCurrent(newItem: string) {
    current.value = newItem;
  }

  return { chooseCurrent, current };
}
