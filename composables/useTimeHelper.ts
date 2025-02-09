export default function () {
  function secondsToMinutes(sec: number) {
    if (!sec) {
      return 0;
    }
    return Number((sec / 60).toFixed(0));
  }
  function minutesToSeconds(min: number) {
    if (!min) {
      return 0;
    }
    return Number(min * 60);
  }

  function getPrettyTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");

    return `${minutesString}:${secondsString}`;
  }

  async function sleep(sleepTimeMs: number): Promise<NodeJS.Timeout> {
    let id: NodeJS.Timeout | null = null;

    return new Promise((resolve) => {
      id = setTimeout(() => resolve(id as NodeJS.Timeout), sleepTimeMs);
    });
  }
  return { secondsToMinutes, minutesToSeconds, getPrettyTime, sleep };
}
