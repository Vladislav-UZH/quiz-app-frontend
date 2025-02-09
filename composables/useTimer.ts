export default function ({
  initialTime = 0,
  intervalDuration = 1000,
  autoStart = false,
  reverse = true,
} = {}) {
  const time = ref(initialTime);
  let timerId: NodeJS.Timeout | null;

  const startTimer = () => {
    if (!timerId) {
      timerId = setInterval(() => {
        if (reverse) {
          time.value = time.value - 1;

          return;
        }
        time.value = time.value + 1;
      }, intervalDuration);
    }
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  // Auto-start the timer if requested
  if (autoStart) {
    startTimer();
  }

  onUnmounted(() => {
    stopTimer();
  });

  return { time, startTimer, stopTimer };
}
