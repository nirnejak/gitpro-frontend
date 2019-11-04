<template>
  <div>
    <section class="hero is-fullheight bg-gradient">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-6-md">
              <h2 class="subtitle">GitPro</h2>
              <h1 class="title is-size-1 mt-20">
                <span></span>
                <br />simplified
              </h1>
              <p
                class="text-dark mt-30"
              >A platform to make repository management and developer activity tracking easier.</p>
              <router-link to="/login" class="button is-primary get-started ml-10 mt-50">
                <span>Get Started</span>
                <span class="icon is-small">
                  <i class="fas fa-sm fa-arrow-right" />
                </span>
              </router-link>
            </div>
            <div class="column is-6-md has-text-centered">
              <img src="@/assets/version_control.svg" alt width="80%" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container has-text-centered">
          <i
            class="fas fa-arrow-down cursor-pointer"
            v-scroll-to="{
            el: '#seeActivitySection',
            duration: 2000,
            // offset: -50
            // easing: [.6, .80, .30, 1.9],
          }"
          />
        </div>
      </div>
    </section>
    <!-- </div> -->

    <div class="hero is-medium">
      <div class="hero-body">
        <div class="columns is-vcentered" id="seeActivitySection">
          <div class="column is-6 has-text-centered">
            <img src="@/assets/developer_activity.svg" alt width="70%" />
          </div>
          <div class="column is-6">
            <h1 class="title is-size-2">See Activity</h1>
            <p>See developer's contributions on your repositories. Goto their page for a daily summary or jump to Activitiy section for full git diff of their contributions.</p>
            <br />
            <router-link to="/login">
              Get Started
              <i class="fas fa-arrow-right ml-5" />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="hero is-medium">
      <div class="hero-body">
        <div class="columns is-vcentered">
          <div class="column is-6">
            <h1 class="title is-size-2">Manage Contributors</h1>
            <p>Easily add or remove collaborators from a repository. Do bulk operations by adding to or removing from multiple repositories, or add an existing collaborator to other repositories.</p>
            <br />
            <router-link to="/login">
              Get Started
              <i class="fas fa-arrow-right ml-5" />
            </router-link>
          </div>
          <div class="column is-6 has-text-centered">
            <img src="@/assets/collaboration.svg" alt width="60%" />
          </div>
        </div>
      </div>
    </div>

    <div class="hero is-medium">
      <div class="hero-body">
        <div class="columns is-vcentered">
          <div class="column is-6 has-text-centered">
            <img src="@/assets/insights.svg" alt width="60%" />
          </div>
          <div class="column is-6">
            <h1 class="title is-size-2">Get Insights</h1>
            <p>How are your developers doing? How is their coding pattern? Are they maintaining code standards and quality? Know it all here.</p>
            <br />
            <router-link to="/login">
              Get Started
              <i class="fas fa-arrow-right ml-5" />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Typed from "typed.js";
import HeroImage from "@/assets/version_control.svg";
import Footer from "@/components/UI/Footer";

export default {
  name: "home",
  components: { Footer },
  data() {
    return {
      options: {
        strings: ["Collaboration", "Repo Management", "Activity Tracking"],
        typeSpeed: 100,
        loop: true
      }
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {
    const typed = new Typed("span", this.options);
  }
};
</script>

<style lang="scss" scoped>
h1.lead-title {
  line-height: 5rem;
  font-size: 4rem;
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
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes leftRight {
  0% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-3px);
  }
}
</style>