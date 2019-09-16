<template>
  <div class="row">
    <Sidebar />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add Collaborator">
      <AddCollaborator :hideModal="hideModal" />
    </Modal>

    <div class="col-9-lg pt-70">
      <div class="px-20">
        <div class="row">
          <div class="col-8-lg">
            <h1>Collaborators</h1>
          </div>
          <div class="col-4-lg pt-10 text-right">
            <button class="button primary" @click="showModal = true" v-if="!showModal">
              Add Collaborator
              &nbsp;
              <i class="fas fa-plus" />
            </button>
          </div>
        </div>
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
              <p class="text-center mt-10 text-high-contrast">{{collaborator.name}}</p>
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