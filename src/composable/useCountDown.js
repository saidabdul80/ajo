import { ref } from "vue";

const useCountdown = (initialTime = 30) => {
  const timeLeft = ref(initialTime);
  const isCounting = ref(false);

  const startCountdown = () => {
    if (isCounting.value) return;

    isCounting.value = true;
    timeLeft.value = initialTime;

    const countdown = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(countdown);
        isCounting.value = false;
      }
    }, 1000);
  };

  return { timeLeft, isCounting, startCountdown };
};

export default useCountdown;
