<template>
  <div class="centered-container">
    <div class="text-center p-20 px-100">
      <p class="text-dark">Welcome to</p>
      <h1 class="error-code">GitHub Supreme</h1>
      <br />
      <router-link to="/login" class="button primary">
        Get Started
        <i class="fas fa-sm fa-arrow-right"></i>
      </router-link>
      <br />
      <br />
      <span></span>
    </div>
  </div>
</template>

<script>
import Typed from "typed.js";

export default {
  name: "home",
  components: {},
  data() {
    return {
      options: {
        strings: ["Build", "Collaborate", "Share"],
        typeSpeed: 40,
        loop: true
      }
    };
  },
  mounted() {
    const typed = new Typed("span", this.options);
  }
};
</script>

<style lang="scss" scoped>
h1.error-code {
  font-size: 5rem;
  margin-top: 0px;
  margin-bottom: 0px;
}

.button {
  transform: scale(1.2);
}

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

// background-image: linear-gradient( 319.6deg,  rgba(243,0,79,1) 20.5%, rgba(255,236,68,1) 110.9% );
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(87,108,117,1) 0%, rgba(37,50,55,1) 100.2% );
</style>