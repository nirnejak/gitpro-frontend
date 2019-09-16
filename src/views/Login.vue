<template>
  <div class="centered-container">
    <div class="text-center p-30 px-80">
      <div>
        <a href="http://localhost:5000/auth/github" class="button dark is-center">
          <i class="fab fa-sm fa-github"></i>&nbsp;
          Continue using GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped lang="scss">
.centered-container {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(239, 246, 249, 1) 0%,
    rgba(206, 239, 253, 1) 90%
  );
  // background-image: radial-gradient(
  //   circle farthest-corner at 18.7% 37.8%,
  //   rgba(250, 250, 250, 1) 0%,
  //   rgba(225, 234, 238, 1) 90%
  // );
}
.button {
  transform: scale(1.2);
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(87, 108, 117, 1) 0%,
    rgba(37, 50, 55, 1) 100.2%
  ) !important;
  border: transparent !important;
  &:hover {
    border: transparent !important;
  }
}
</style>