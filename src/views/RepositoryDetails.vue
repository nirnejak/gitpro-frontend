<template>
  <div class="row">
    <Sidebar :show="true" />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add Collaborators">
      <AddCollaboratorsToRepo
        :repository="repository"
        :hideModal="hideModal"
        :alreadyCollaborators="collaborators"
      />
    </Modal>

    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="row">
          <div class="col-1-lg is-vertical-align">
            <i class="fas fa-4x fa-code-branch mr-5" />
          </div>
          <div class="col-7-lg is-vertical-align">
            <div>
              <h1 class="m-0">{{$route.params.name}}</h1>
              <p class="m-0 text-dark">{{repository.description}}</p>
              <SkeletonLoader
                width="100%"
                height="20px"
                radius="5px"
                v-if="repositoryDetailsLoading"
              />
            </div>
          </div>
          <div class="col-4-lg is-vertical-align is-right">
            <!-- TODO: Add Optional Link for GitHub/Bitbucket/Gitlab -->
            <a
              :href="`http://github.com/${user.login}/${$route.params.name}`"
              class="sidebar-link pr-20"
              target="_blank"
            >
              <i class="fas fa-external-link-alt" />&nbsp;
              View on GitHub
            </a>
          </div>
        </div>

        <div class="row mt-100">
          <div class="col-4-lg">
            <h2>Collaborators</h2>
          </div>
          <div class="col-8-lg is-right">
            <button
              class="button primary outline text-error bd-error"
              v-if="selectedCollaborators.length > 0"
              @click="revokeAccess()"
            >
              <i class="fas fa-times" />&nbsp;
              Revoke Access
            </button>
            <button class="button dark outline" @click="refreshData">
              <i class="fas fa-sync-alt" />&nbsp;
              Refersh Data
            </button>
            <button type="submit" class="button primary outline" @click="showModal = true">
              <i class="fas fa-plus" />&nbsp;
              Add Collaborator
            </button>
          </div>
          <div class="col-12" v-if="collaborators.length === 0 && !repositoryDetailsLoading">
            <div class="is-center is-vertical-align py-100">
              <h3 class="text-dark text-center">
                <i class="fas fa-3x fa-times" />
                <br />No Collaborators
              </h3>
            </div>
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
                @change="addRemoveCollaborator(collaborator.login)"
              />
              <label :for="collaborator.login" class="collaborator-check-label">
                <i class="fas fa-check-circle text-light" />
              </label>
              <label :for="collaborator.login">
                <div class="collaborator-avatar position-relative">
                  <div
                    class="bg-card rounded-circle bg-cover"
                    :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                  />
                  <div class="overlay rounded-circle" />
                </div>
              </label>
            </div>
            <router-link :to="`/collaborators/${collaborator.login}`">
              <p class="text-center mt-10 text-high-contrast">{{collaborator.name}}</p>
            </router-link>
            <router-link :to="`/collaborators/${collaborator.login}`">
              <small class="text-center text-dark is-center">{{collaborator.login}}</small>
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
import SkeletonLoader from "@/components/UI/SkeletonLoader";
import Modal from "@/components/UI/Modal";
import AddCollaboratorsToRepo from "@/components/AddCollaboratorsToRepo";

export default {
  name: "RepositoryDetails",
  components: { Sidebar, SkeletonLoader, Modal, AddCollaboratorsToRepo },
  data() {
    return {
      user: { login: localStorage.login },
      repository: {},
      collaborators: [],
      repositoryDetailsLoading: true,
      selectedCollaborators: [],
      showModal: false
    };
  },
  created() {
    axios.get(`/repositories/${this.$route.params.name}`).then(res => {
      this.repositoryDetailsLoading = false;
      this.repository = res.data.repository;
      this.collaborators = res.data.collaborators;
    });
  },
  methods: {
    revokeAccess() {
      let confirm = window.confirm(
        "Are you sure you want to remove the collaborators from the repository?"
      );
      if (confirm) {
        this.selectedCollaborators.forEach((collaborator, index) => {
          axios
            .put(
              `/repositories/${this.repository.name}?collaborator=${collaborator}`
            )
            .then(res => {
              if (index === this.selectedCollaborators.length - 1) {
                this.collaborators = this.collaborators.filter(
                  collaborator =>
                    !this.selectedCollaborators.includes(collaborator.login)
                );
                this.selectedCollaborators = [];

                this.$message.success({
                  message: res.data.message,
                  position: "bottom-right",
                  showClose: true
                });
                $router.push("/repositories");
              }
            })
            .catch(err => console.log(err));
        });
      }
    },
    addRemoveCollaborator(collab) {
      if (this.selectedCollaborators.includes(collab)) {
        this.selectedCollaborators = this.selectedCollaborators.filter(
          collaborator => collaborator !== collab
        );
      } else {
        this.selectedCollaborators.push(collab);
      }
    },
    hideModal() {
      this.showModal = false;
    },
    refreshData() {
      axios.get("/fetch/repositories/").then(res => {
        this.$message.success({
          message: res.data.message,
          position: "bottom-right",
          showClose: true
        });
      });
    }
  }
};
</script>