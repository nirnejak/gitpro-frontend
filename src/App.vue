<template>
  <div style="padding-left: calc(var(--grid-gutter)/2); padding-right: calc(var(--grid-gutter)/2);">
    <div class="top-collar d-none">Beta</div>
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
