<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="row">
          <div class="col-2-lg">
            <SkeletonLoader width="100%" height="150px" radius="10px" v-if="collaboratorDetailsLoading"/>
            <div
              class="bg-white border-radius-10 bg-cover w-100"
              :style="`background-image: url(${collaborator.avatar_url}); padding-top: 100%;`"
              v-else
            ></div>
          </div>
          <div class="col-6-lg is-vertical-align">
            <div class="ml-10">
              <h1 class="m-0">{{collaborator.name}}</h1>
              <h3 class="m-0 text-dark">{{$route.params.login}}</h3>
            </div>
          </div>
          <div class="col-4-lg is-vertical-align is-right">
            <div>
              <a href="#" class="sidebar-link pr-20">
                <i class="fas fa-user-times"></i>&nbsp;
                Remove Collaborator
              </a>
              <br />
              <br />
              <!-- TODO: Add Links for GitHub/Bitbucket/Gitlab -->
              <a
                :href="`http://github.com/${$route.params.login}`"
                class="sidebar-link pr-20"
                target="_blank"
              >
                <i class="fas fa-external-link-alt"></i>&nbsp;
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div class="row mt-30">
          <div class="col-8-lg">
            <h2>Repositories</h2>
          </div>
          <div class="col-4-lg is-right">
            <button class="button primary outline">
              <i class="fas fa-times"></i>&nbsp;
              Revoke Access
            </button>
          </div>
        </div>
        <div class="row" v-if="collaborator">
          <div class="col-3" v-for="repository in collaborator.repositories" :key="repository.name">
            <input type="checkbox" :name="repository.name" :id="repository.name" class="d-none" />
            <label :for="repository.name" class="repo-checkbox">
              <div class="bg-white border-radius-5 p-20 my-5">
                <div class="row">
                  <div class="col-10 text-overflow-ellipsis">
                    <i class="fas fa-code-branch"></i>
                    {{repository.name}}
                  </div>
                  <div class="col-2">
                    <i class="fas fa-check-circle text-light pull-right mt-5"></i>
                  </div>
                </div>
              </div>
            </label>
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
  name: "CollaboratorDetails",
  components: { Sidebar, SkeletonLoader },
  data() {
    return {
      user: { login: localStorage.login },
      collaborator: {},
      collaboratorDetailsLoading: true
    };
  },
  created() {
    axios.get(`/collaborators/${this.$route.params.login}`).then(res => {
      this.collaboratorDetailsLoading = false;
      this.collaborator = res.data;
    });
  }
};
</script>

<style lang="scss">
label.repo-checkbox {
  cursor: pointer;
  & > div {
    border: white 1px solid;
  }
}

input[type="checkbox"]:checked + label.repo-checkbox > div {
  border: var(--color-primary) 1px solid;
  & > div > div > i.fa-check-circle {
    color: var(--color-primary) !important;
  }
}
</style>