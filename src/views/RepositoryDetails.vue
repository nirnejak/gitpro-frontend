<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="row">
          <div class="col-1-lg is-vertical-align">
            <i class="fas fa-4x fa-code-branch mr-5"></i>
          </div>
          <div class="col-7-lg is-vertical-align">
            <div>
              <h1 class="m-0">{{$route.params.name}}</h1>
              <p class="m-0 text-dark">{{repository.description}}</p>
            </div>
          </div>
          <div class="col-4-lg is-vertical-align is-right">
            <!-- TODO: Add Optional Link for GitHub/Bitbucket/Gitlab -->
            <a
              :href="`http://github.com/${user.login}/${$route.params.name}`"
              class="sidebar-link pr-20"
              target="_blank"
            >
              <i class="fas fa-external-link-alt"></i>&nbsp;
              View on GitHub
            </a>
          </div>
        </div>

        <div class="row mt-30">
          <div class="col-8-lg">
            <h2>Collaborators</h2>
          </div>
          <div class="col-4-lg is-right">
            <button class="button primary outline">
              <i class="fas fa-times"></i>&nbsp;
              Revoke Access
            </button>
          </div>
          <div
            class="col-2 p-5 collaborator-avatar-container"
            v-for="collaborator in collaborators"
            :key="collaborator.login"
          >
            <div class="is-center">
              <input
                type="checkbox"
                :name="collaborator.login"
                :id="collaborator.login"
                class="d-none"
              />
              <label :for="collaborator.login" class="collaborator-check-label">
                <i class="fas fa-check-circle text-light"></i>
              </label>
              <div class="collaborator-avatar position-relative">
                <div
                  class="bg-white rounded-circle bg-cover"
                  :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                ></div>
                <div class="overlay rounded-circle"></div>
              </div>
            </div>
            <router-link :to="`/collaborators/${collaborator.login}`">
              <p class="is-text-center mt-10 text-black">{{collaborator.name}}</p>
            </router-link>
            <router-link :to="`/collaborators/${collaborator.login}`">
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
  name: "RepositoryDetails",
  components: { Sidebar, SkeletonLoader },
  data() {
    return {
      user: { login: localStorage.login },
      repository: {},
      collaborators: [],
      repositoryDetailsLoading: true
    };
  },
  created() {
    axios.get(`/repositories/${this.$route.params.name}`).then(res => {
      this.repositoryDetailsLoading = false;
      this.repository = res.data.repository;
      this.collaborators = res.data.collaborators;
    });
  }
};
</script>