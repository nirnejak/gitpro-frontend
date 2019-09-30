<template>
  <div class="home-container">
    <div class="nav" style="height: 50px;">
      <div class="nav-left">
        <div class="nav-brand px-20">
          <h4>GitSupreme</h4>
        </div>
      </div>
      <div class="nav-right">
        <router-link to="/login" class="button primary">
          Login
          <i class="fas fa-xs fa-arrow-right" />
        </router-link>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6-lg">
          <div class="is-vertical-align" style="height: calc(100vh - 80px)">
            <div class="p-20">
              <h1 class="error-code">
                <span></span>
                <br />made easy
              </h1>
              <router-link to="/login" class="button primary get-started ml-20 mt-50">
                Get Started
                <i class="fas fa-sm fa-arrow-right" />
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-6-lg"></div>
      </div>
    </div>
    <div class="is-center" style="height: 30px;">
      <i class="fas fa-arrow-down" />
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
        strings: ["Collaboration", "Tracking"],
        typeSpeed: 100,
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
  font-size: 6rem;
  margin-top: 0px;
  margin-bottom: 0px;
}

.button.get-started {
  transform: scale(1.2);
}

.fa-arrow-down {
  animation: 2s upDown infinite;
}

@keyframes upDown {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

// .centered-container {
.home-container {
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