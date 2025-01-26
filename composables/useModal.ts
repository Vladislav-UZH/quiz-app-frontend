export default function () {
  const isOpen = useState("modalIsOpen", () => false);

  function toggleModal() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggleModal };
}
