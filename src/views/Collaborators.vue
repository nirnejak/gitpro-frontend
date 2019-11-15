<template>
  <div class="columns">
    <Sidebar :show="true" />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add Collaborator">
      <AddCollaborator :hideModal="hideModal" />
    </Modal>

    <div class="column is-9 pt-70">
      <div class="px-20">
        <div class="columns mb-30">
          <div class="column is-8">
            <h1 class="title is-size-3 has-text-black">Collaborators({{collaborators.length}})</h1>
          </div>
          <div class="column is-4 pt-10 has-text-right-tablet has-text-centered">
            <button class="button is-primary" @click="showModal = true" v-if="!showModal">
              <span>Add Collaborator</span>
              <span class="icon is-small">
                <i class="fas fa-plus" />
              </span>
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
        <div class="columns is-multiline">
          <div
            class="column is-2 p-5 pb-30"
            v-for="collaborator in collaborators"
            :key="collaborator.login"
          >
            <div class="collaborator-avatar-container has-text-centered">
              <router-link :to="`/collaborators/${collaborator.login}`">
                <div class="columns is-centered is-mobile">
                  <div class="collaborator-avatar position-relative is-center">
                    <div
                      class="bg-card rounded-circle bg-cover"
                      :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                    />
                    <div class="overlay rounded-circle" />
                  </div>
                </div>
                <p class="mt-10 text-high-contrast">{{collaborator.name}}</p>
                <small class="has-text-dark is-center">{{collaborator.login}}</small>
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