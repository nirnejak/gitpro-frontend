<template>
  <div class="columns">
    <Sidebar :show="true" />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add Collaborators">
      <AddCollaboratorsToRepo
        :repository="repository"
        :hideModal="hideModal"
        :alreadyCollaborators="collaborators"
      />
    </Modal>

    <div class="column is-9 pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="columns">
          <div class="column is-1 is-vertical-align">
            <i class="fas fa-4x fa-code-branch mr-5" />
          </div>
          <div class="column is-7 is-vertical-align">
            <div>
              <h1 class="title is-size-3 m-0">{{$route.params.name}}</h1>
              <p class="has-text-dark mb-5">
                by
                <span class="text-high-contrast">{{repository.owner}}</span>
              </p>
              <p class="has-text-dark">{{repository.description}}</p>
              <SkeletonLoader
                width="100%"
                height="20px"
                radius="5px"
                v-if="repositoryDetailsLoading"
              />
            </div>
          </div>
          <div class="column is-4 has-text-right-tablet" v-if="repository">
            <!-- TODO: Add Optional Link for GitHub/Bitbucket/Gitlab -->
            <a
              :href="`http://github.com/${$route.params.owner}/${$route.params.name}`"
              class="sidebar-link pr-20"
              target="_blank"
            >
              <i class="fas fa-external-link-alt" />&nbsp;
              View on GitHub
            </a>
          </div>
        </div>

        <div class="columns mt-70">
          <div class="column is-4">
            <h2 class="title is-size-4">Collaborators</h2>
          </div>
          <div class="column is-8 has-text-right-tablet">
            <button
              class="button is-danger is-light mx-10"
              v-if="selectedCollaborators.length > 0"
              @click="revokeAccess()"
            >
              <span class="icon is-small">
                <i class="fas fa-times" />
              </span>
              <span>Revoke Access</span>
            </button>
            <button class="button is-success is-light mx-10" @click="refreshData">
              <span class="icon is-small">
                <i class="fas fa-sync-alt" />
              </span>
              <span>Refersh Data</span>
            </button>
            <button
              type="submit"
              class="button is-link is-light mx-10"
              @click="showModal = true"
              v-if="user.login === repository.owner"
            >
              <span class="icon is-small">
                <i class="fas fa-plus" />
              </span>
              <span>Add Collaborator</span>
            </button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-2 p-5 pb-30">
            <div class="collaborator-avatar-container has-text-centered">
              <div class="columns is-centered">
                <router-link to="/dashboard">
                  <div class="collaborator-avatar position-relative">
                    <div
                      class="bg-card rounded-circle bg-cover"
                      :style="`background-image: url(${user.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                    />
                    <div class="overlay rounded-circle" />
                  </div>
                </router-link>
              </div>
              <router-link to="/dashboard">
                <p class="mt-10 text-high-contrast">{{user.name || user.login}}</p>
              </router-link>
              <router-link
                :to="`/activities/?collaborator=${user.login}&repository=${$route.params.name}&owner=${$route.params.owner}`"
              >
                <small class="text-primary is-center">View Activity</small>
              </router-link>
            </div>
          </div>

          <div
            class="column is-2 p-5 pb-30"
            v-for="collaborator in collaborators"
            :key="collaborator.login"
          >
            <div class="collaborator-avatar-container has-text-centered">
              <div class="columns is-centered">
                <input
                  type="checkbox"
                  :name="collaborator.login"
                  :id="collaborator.login"
                  class="d-none"
                  @change="addRemoveCollaborator(collaborator.login)"
                  v-if="user.login === repository.owner"
                />
                <label
                  :for="collaborator.login"
                  class="collaborator-check-label"
                  v-if="user.login === repository.owner"
                >
                  <i class="fas fa-check-circle text-light" />
                </label>
                <router-link :to="`/collaborators/${collaborator.login}`">
                  <div class="collaborator-avatar position-relative">
                    <div
                      class="bg-card rounded-circle bg-cover"
                      :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                    />
                    <div class="overlay rounded-circle" />
                  </div>
                </router-link>
              </div>
              <router-link :to="`/collaborators/${collaborator.login}`">
                <p
                  class="mt-10 text-high-contrast"
                >{{collaborator.name || collaborator.login}}</p>
              </router-link>
              <router-link
                :to="`/activities/?collaborator=${collaborator.login}&repository=${$route.params.name}&owner=${$route.params.owner}`"
              >
                <small class="text-primary is-center">View Activity</small>
              </router-link>
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
import SkeletonLoader from "@/components/UI/SkeletonLoader";
import Modal from "@/components/UI/Modal";
import AddCollaboratorsToRepo from "@/components/AddCollaboratorsToRepo";

export default {
  name: "RepositoryDetails",
  components: { Sidebar, SkeletonLoader, Modal, AddCollaboratorsToRepo },
  data() {
    return {
      user: {
        login: localStorage.login,
        avatar_url: localStorage.avatar_url,
        name: localStorage.name
      },
      repository: {},
      collaborators: [],
      repositoryDetailsLoading: true,
      selectedCollaborators: [],
      showModal: false
    };
  },
  created() {
    axios
      .get(
        `/repositories/${this.$route.params.owner}/${this.$route.params.name}`
      )
      .then(res => {
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