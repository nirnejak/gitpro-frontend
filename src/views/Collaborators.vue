<template>
  <div class="columns">
    <Sidebar :show="true" />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add Collaborator">
      <AddCollaborator :hideModal="hideModal" />
    </Modal>

    <div class="column is-9 pt-70">
      <div class="px-20">
        <div class="columns">
          <div class="column is-8">
            <h1 class="is-size-2">Collaborators({{collaborators.length}})</h1>
          </div>
          <div class="column is-4 pt-10 has-text-right-tablet">
            <button class="button primary" @click="showModal = true" v-if="!showModal">
              Add Collaborator
              &nbsp;
              <i class="fas fa-plus" />
            </button>
          </div>
        </div>
        <div class="columns" v-if="collaboratorLoading">
          <div class="column is-2 p-5" v-for="i in 6" :key="i">
            <div class="is-center">
              <SkeletonLoader width="150px" height="150px" radius="50%" />
            </div>
          </div>
        </div>
        <div class="columns" v-if="!collaboratorLoading && !collaborators.length">
          <div class="column">
            <div class="has-text-centered">
              <p>No Collaborators</p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div
            class="column is-2 p-5 pb-30"
            v-for="collaborator in collaborators"
            :key="collaborator.login"
          >
            <div class="collaborator-avatar-container">
              <router-link :to="`/collaborators/${collaborator.login}`">
                <div class="is-center">
                  <div class="collaborator-avatar position-relative is-center">
                    <div
                      class="bg-card rounded-circle bg-cover"
                      :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                    />
                    <div class="overlay rounded-circle" />
                  </div>
                </div>
                <p class="has-text-centered mt-10 text-high-contrast">{{collaborator.name}}</p>
                <small class="has-text-centered text-dark is-center">{{collaborator.login}}</small>
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

import AddCollaborator from "@/components/AddCollaborator";

export default {
  name: "Collaborators",
  components: { Sidebar, SkeletonLoader, Modal, AddCollaborator },
  data() {
    return {
      collaborators: [],
      collaboratorLoading: true,
      showModal: false
    };
  },
  created() {
    axios.get("/collaborators").then(res => {
      this.collaboratorLoading = false;
      this.collaborators = res.data;
    });
  },
  methods: {
    showAddCollaboratorModal() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    }
  }
};
</script>