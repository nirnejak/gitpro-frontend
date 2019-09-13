<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Collaborators</h1>
        <div class="row" v-if="collaboratorLoading">
          <div class="col-2 p-5" v-for="i in 6" :key="i">
            <div class="is-center">
              <SkeletonLoader width="150px" height="150px" radius="50%" />
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-2 p-5 collaborator-avatar-container"
            v-for="collaborator in collaborators"
            :key="collaborator.login"
          >
            <router-link :to="`/collaborators/${collaborator.login}`">
              <div class="is-center">
                <div class="collaborator-avatar position-relative is-center">
                  <div
                    class="bg-card rounded-circle bg-cover"
                    :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                  ></div>
                  <div class="overlay rounded-circle"></div>
                </div>
              </div>
              <p class="is-text-center mt-10 text-highcontrast">{{collaborator.name}}</p>
              <small class="is-text-center text-dark is-center">{{collaborator.login}}</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import SkeletonLoader from "@/components/SkeletonLoader";

export default {
  name: "Collaborators",
  components: { Sidebar, SkeletonLoader },
  data() {
    return {
      collaborators: [],
      collaboratorLoading: true
    };
  },
  created() {
    axios.get("/collaborators").then(res => {
      this.collaboratorLoading = false;
      this.collaborators = res.data;
    });
  }
};
</script>