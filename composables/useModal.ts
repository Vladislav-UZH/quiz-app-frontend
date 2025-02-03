export default function (name: string = "modalIsOpen") {
  const isOpen = useState(name, () => false);

  function toggleModal() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggleModal };
}
