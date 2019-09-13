<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Settings</h1>
        <div class="row">
          <div class="col-12">
            <div class="bg-white border-radius-10 p-20">
              <div class="row">
                <div class="col-10 is-vertical-align">Include Public Repositories</div>
                <div class="col-2 is-center">
                  <ToggleButton @change="includePublicToggle" />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-10 is-vertical-align">Deactivate Account?</div>
                <div class="col-2 is-center">
                  <button class="button clear" @click="deactivateAccount">
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
import ToggleButton from "@/components/ToggleButton";

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
    }
  }
};
</script>