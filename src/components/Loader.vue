<template>
  <div class="loader" :style="{width, height, 'border-radius': radius}">
    <div class="gradient"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ["width", "height", "radius"]
};
</script>

<style lang="scss" scoped>
@keyframes moveGradient {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(1000%);
  }
}

.loader {
  overflow: hidden;
  background: rgba(0, 0, 0, 0.04);
  & > .gradient {
    width: 10%;
    height: 100%;
    background-image: linear-gradient(
      to right,
      transparent,
      #f4f4f4,
      transparent
    );
    animation-name: moveGradient;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }
}
</style>