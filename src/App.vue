<template>
  <div>
    <div class="top-collar">Unreleased</div>
    <router-view />
  </div>
</template>

<script>
import { darkTheme, lightTheme } from "@/config";

export default {
  name: "App",
  created() {
    const rootElement = document.querySelector(":root");

    if (localStorage.theme === "dark") {
      Object.keys(darkTheme).forEach(key => {
        rootElement.style.setProperty(key, darkTheme[key]);
      });
    } else {
      Object.keys(lightTheme).forEach(key => {
        rootElement.style.setProperty(key, lightTheme[key]);
      });
      localStorage.theme = "light";
    }
  }
};
</script>

<style lang="scss" src="@/sass/main.scss">
</style>
