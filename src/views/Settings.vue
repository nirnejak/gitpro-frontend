<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70">
      <div class="px-20">
        <h1 class="title is-size-3">Settings</h1>
        <div class="columns">
          <div class="column">
            <div class="bg-card border-radius-10 p-20">
              <!-- <div class="columns">
                <div class="column is-10 is-vertical-align">Include Public Repositories</div>
                <div class="column is-2 is-center">
                  <ToggleButton @change="includePublicToggle" id="includePublicToggle" />
                </div>
              </div>
              <br />-->
              <div class="columns">
                <div class="column is-10 is-vertical-align">Dark Mode</div>
                <div class="column is-2 is-center">
                  <ToggleButton
                    id="darkModeToggle"
                    :value="theme === 'dark'"
                    @change="darkModeToggle"
                  />
                </div>
              </div>
              <br />
              <div class="columns">
                <div class="column is-10 is-vertical-align">Deactivate Account?</div>
                <div class="column is-2 is-center">
                  <button class="button is-outlined" @click="deactivateAccount">
                    <span class="text-error">Deactivate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import ToggleButton from "@/components/UI/ToggleButton";

import { darkTheme, lightTheme } from "@/config";

export default {
  name: "Settings",
  components: { Sidebar, ToggleButton },
  data() {
    return {
      theme: localStorage.theme || "light"
    };
  },
  methods: {
    includePublicToggle() {
      console.log("Include Public Toggle");
    },
    deactivateAccount() {
      axios.delete(`/users/${localStorage.login}`).then(res => {
        this.$message.success({
          message: res.data.message,
          position: "bottom-right",
          showClose: true
        });
        this.$router.push("/logout");
      });
      console.log("Deactivate Account");
    },
    includePublicToggle(e) {
      // TODO: Implement includePublicToggle
    },
    darkModeToggle(e) {
      const rootElement = document.querySelector(":root");

      if (e) {
        Object.keys(darkTheme).forEach(key => {
          rootElement.style.setProperty(key, darkTheme[key]);
        });
        localStorage.theme = "dark";
      } else {
        Object.keys(lightTheme).forEach(key => {
          rootElement.style.setProperty(key, lightTheme[key]);
        });
        localStorage.theme = "light";
      }
    }
  }
};
</script>