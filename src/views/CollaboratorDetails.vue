<template>
  <div class="row">
    <Sidebar />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add to Repository">
      <RepoAdd
        :collaborator="collaborator"
        :hideModal="hideModal"
        :alreadyCollaborator="collaborator.repositories"
      />
    </Modal>

    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="row">
          <div class="col-2-lg">
            <SkeletonLoader
              width="100%"
              height="150px"
              radius="10px"
              v-if="collaboratorDetailsLoading"
            />
            <div
              class="bg-card border-radius-10 bg-cover w-100"
              :style="`background-image: url(${collaborator.avatar_url}); padding-top: 100%;`"
              v-else
            ></div>
          </div>
          <div class="col-5-lg is-vertical-align">
            <div class="ml-10">
              <h1 class="m-0">{{collaborator.name}}</h1>
              <SkeletonLoader
                width="100%"
                height="30px"
                radius="5px"
                v-if="collaboratorDetailsLoading"
              />
              <h3 class="m-0 text-dark">{{$route.params.login}}</h3>
            </div>
          </div>
          <div class="col-4-lg is-vertical-align is-right">
            <div>
              <span href="#" class="text-error cursor-pointer pr-20">
                <i class="fas fa-user-times"></i>&nbsp;
                Remove Collaborator
              </span>
              <br />
              <br />
              <a :href="`http://github.com/${$route.params.login}`" class="pr-20" target="_blank">
                <i class="fas fa-external-link-alt"></i>&nbsp;
                View on GitHub
              </a>
            </div>
          </div>
        </div>
        <div class="row mt-30">
          <div class="col-4-lg">
            <h2>Repositories</h2>
          </div>
          <div class="col-8-lg is-right">
            <button
              type="submit"
              class="button primary outline text-error bd-error"
              v-if="selectedRepositories.length > 0"
              @click="revokeAccess()"
            >
              <i class="fas fa-times"></i>&nbsp;
              Revoke Access
            </button>
            <button
              type="submit"
              class="button primary outline"
              @click="showModal = true"
              v-if="!showModal"
            >
              <i class="fas fa-plus"></i>&nbsp;
              Add to Repo
            </button>
          </div>
        </div>

        <div class="row" v-if="collaboratorDetailsLoading">
          <div class="col-3" v-for="i in 4" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" class="my-10" />
          </div>
        </div>

        <div class="row" v-if="collaborator">
          <div
            class="col-3"
            v-for="repository in collaborator.repositories"
            :key="repository.name"
            @click="addRemoveRepo(repository.name)"
          >
            <input
              type="checkbox"
              :name="repository.name"
              :id="repository.name"
              class="d-none"
              @change="addRemoveRepo(repository.name)"
            />
            <label :for="repository.name" class="repo-checkbox">
              <div class="bg-card border-radius-5 p-20 my-5">
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
import Modal from "@/components/Modal";
import RepoAdd from "@/components/RepoAdd";

export default {
  name: "CollaboratorDetails",
  components: { Sidebar, SkeletonLoader, Modal, RepoAdd },
  data() {
    return {
      user: { login: localStorage.login },
      collaborator: {},
      collaboratorDetailsLoading: true,
      selectedRepositories: [],
      showModal: false
    };
  },
  created() {
    axios.get(`/collaborators/${this.$route.params.login}`).then(res => {
      this.collaboratorDetailsLoading = false;
      this.collaborator = res.data;
    });
  },
  methods: {
    revokeAccess() {
      this.selectedRepositories.forEach((repo, index) => {
        axios
          .put(`/collaborators/${this.collaborator.login}?repo=${repo}`)
          .then(res => {
            if (index === this.selectedRepositories - 1) {
              this.$message.success({
                message: res.data.message,
                position: "bottom-right",
                showClose: true
              });
              $router.push("/dashboard");
            }
          })
          .catch(err => console.log(err));
      });
    },
    addRemoveRepo(repoName) {
      if (this.selectedRepositories.includes(repoName)) {
        this.selectedRepositories = this.selectedRepositories.filter(
          repo => repo !== repoName
        );
      } else {
        this.selectedRepositories.push(repoName);
      }
    },
    hideModal() {
      this.showModal = false;
    }
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