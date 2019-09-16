<template>
  <div class="snackbar-container is-center">
    <div
      class="snackbar-content is-center pt-5"
      :class="{
        'transform': show, 
        'primary': type==='primary',
        'error': type==='error'
        }"
    >
      <span>{{message}}</span>
      <i class="fas fa-times cursor-pointer pull-right pl-10" @click="hideSnackBar"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  props: ["show", "message", "type", "hideSnackBar"],
  updated() {
    if (this.$props.show) {
      setTimeout(() => {
        this.$props.hideSnackBar();
      }, 3000);
    }
  }
};
</script>

<style lang="scss">
$height: 40px;
$bottom: -40px;

.snackbar-container {
  position: fixed !important;
  z-index: 10000;
  right: 0;
  bottom: $bottom;

  width: 100%;

  & > .snackbar-content {
    color: white;
    width: 50%;

    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    height: $height;

    transition: all 0.3s ease-in-out;
  }
}

.transform {
  transform: translateY($bottom);
}

.primary {
  background: var(--color-primary);
}

.error {
  background: var(--color-error);
}
</style>