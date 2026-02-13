<template>
  <ClientOnly>
    <ValentineCard />
    <template #fallback>
      <div class="flex items-center justify-center min-h-screen bg-pink-50">
        <p class="text-2xl text-pink-400 animate-pulse">💖 Завантажується...</p>
      </div>
    </template>
  </ClientOnly>
</template>
