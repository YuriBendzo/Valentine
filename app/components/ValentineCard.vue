<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import gsap from "gsap";
import confetti from "canvas-confetti";

const { width: winWidth, height: winHeight } = useWindowSize();

const noBtn = ref<HTMLElement | null>(null);

const isRunning = ref(false);
const hasWon = ref(false);

const runaway = () => {
  if (!noBtn.value) return;

  if (!isRunning.value) {
    isRunning.value = true;
    const rect = noBtn.value.getBoundingClientRect();
    gsap.set(noBtn.value, {
      position: "fixed",
      left: rect.left,
      top: rect.top,
      margin: 0,
    });
  }

  const btnRect = noBtn.value.getBoundingClientRect();
  const btnWidth = btnRect.width;
  const btnHeight = btnRect.height;

  const padding = 20;
  const maxX = winWidth.value - btnWidth - padding;
  const maxY = winHeight.value - btnHeight - padding;
  const minX = padding;
  const minY = padding;

  let newX = Math.random() * (maxX - minX) + minX;
  let newY = Math.random() * (maxY - minY) + minY;

  gsap.to(noBtn.value, {
    left: newX,
    top: newY,
    duration: 0.4,
    ease: "power3.out",
    overwrite: true,
  });
};

const handleYesClick = () => {
  hasWon.value = true;
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff0000", "#ffccd5"],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff0000", "#ffccd5"],
    });
  }, 500);
};

const resetGame = () => {
  hasWon.value = false;
  isRunning.value = false;
  if (noBtn.value) {
    gsap.set(noBtn.value, { clearProps: "all" });
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-pink-50 p-4 overflow-hidden relative"
  >
    <!-- Floating Hearts BG -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-30"
    >
      <div
        v-for="i in 20"
        :key="i"
        class="absolute animate-float text-pink-300"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 3 + 1}rem`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 10}s`,
        }"
      >
        ❤️
      </div>
    </div>

    <div
      class="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative z-10 transition-all duration-500"
      :class="{ 'scale-0 opacity-0': hasWon }"
    >
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjVpMXJpZzluejNtbmM4YW50dWo4bmYxcjR2NGJ2MnFidms2djlqbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1BiOSmRVR6GiQtWNUc/giphy.gif"
        alt="Funny Cat"
        class="w-full h-48 object-cover rounded-xl mb-6 shadow-md"
      />

      <h1 class="text-3xl font-bold text-red-600 mb-2 font-display">
        Будеш моєю Валентинкою?
      </h1>
      <p class="text-gray-500 mb-8 text-balance">
        <span>В мене є план: кава і харизма.</span>
        <span class="block">Харизма іноді підводить, але кава стабільна.</span>
      </p>

      <div class="flex justify-center gap-4 relative md:h-14">
        <button
          @click="handleYesClick"
          class="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-xl shadow-lg transform transition hover:scale-110 active:scale-95 cursor-pointer z-20"
        >
          ТАК! 🥰
        </button>

        <button
          ref="noBtn"
          @mouseover="runaway"
          @touchstart.prevent="runaway"
          @click="runaway"
          class="px-8 py-3 bg-red-500 text-white font-bold rounded-full text-xl shadow-lg cursor-pointer z-20"
        >
          НІ 😢
        </button>
      </div>
    </div>

    <div
      v-if="hasWon"
      class="fixed inset-0 flex flex-col items-center justify-center bg-pink-100/90 backdrop-blur-sm z-50 animate-fade-in text-center p-4"
    >
      <h1
        class="text-6xl flex items-center font-extrabold text-red-500 mb-4 animate-bounce"
      >
        ЙУХУ!!!
        <video autoplay loop muted class="w-32">
          <source src="/animations/confetti.webm" type="video/webm" />
        </video>
      </h1>
      <p class="text-2xl text-pink-700 font-medium max-w-lg">
        <span>Кава готується.</span>
        <span class="block">Я теж.</span>
      </p>
      <div class="mt-8 text-8xl flex items-center gap-4">
        <video autoplay loop muted class="w-32">
          <source src="/animations/coffee.webm" type="video/webm" />
        </video>
        <video autoplay loop muted class="w-32">
          <source src="/animations/winking-emoji.webm" type="video/webm" />
        </video>
      </div>
      <button
        type="button"
        @click="resetGame"
        class="mt-12 text-sm text-gray-400 hover:text-gray-600 underline cursor-pointer"
      >
        Спробувати знову
      </button>
    </div>
  </div>
</template>

<style>
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

.animate-float {
  animation-name: float;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
