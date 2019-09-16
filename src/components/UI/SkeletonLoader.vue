<template>
  <div class="loader" :style="{width, height, 'border-radius': radius}">
    <div class="gradient"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: ["width", "height", "radius"]
};
</script>

<style lang="scss" scoped>
@keyframes moveGradient {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100vw);
  }
}

.loader {
  overflow: hidden;
  background: var(--color-loader-bg);
  & > .gradient {
    width: 10%;
    height: 100%;
    background-image: linear-gradient(
      to right,
      transparent,
      var(--body-background),
      transparent
    );
    animation-name: moveGradient;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
}
</style>