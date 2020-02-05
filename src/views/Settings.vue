<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70">
      <div class="px-20">
        <h1 class="title is-size-3 has-text-black">Settings</h1>
        <div class="columns">
          <div class="column">
            <div class="box border-radius-10 p-20">
              <div class="columns is-mobile">
                <div class="column is-7">Deactivate Account?</div>
                <div class="column is-5 has-text-right">
                  <button class="button is-danger is-outlined" @click="deactivateAccount">Deactivate</button>
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

export default {
  name: "Settings",
  components: { Sidebar, ToggleButton },
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
  }
};
</script>