<template>
  <div>
    <input type="text" placeholder="Search Collaborator" v-model="search" />
    <div class="row mb-10 mt-15">
      <div class="col-12">
        <p class="text-dark">
          Collaborators
          <small>({{selectedCollaborators.length}} Selected)</small>
        </p>
      </div>
    </div>

    <div class="collaborator-list-container mb-15">
      <div class="row">
        <div
          class="col-3 p-5"
          v-for="collaborator in collaborators"
          :key="collaborator.login"
          @click="selectCollaborator(collaborator.login)"
        >
        <div class="collaborator-avatar-container">
          <div class="is-center">
            <input
              type="checkbox"
              :name="collaborator.login"
              :id="collaborator.login"
              class="d-none"
              @click="selectCollaborator(collaborator.login)"
            />
            <label :for="collaborator.login" class="collaborator-check-label">
              <i
                class="fas fa-check-circle text-light"
                :class="{
                'text-primary': selectedCollaborators.includes(collaborator.login),
                'text-light': !selectedCollaborators.includes(collaborator.login),
              }"
              />
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
          <label :for="collaborator.login" class="cursor-pointer">
            <p class="text-center mt-10 text-high-contrast">{{collaborator.name}}</p>
            <small class="text-center text-dark is-center">{{collaborator.login}}</small>
          </label>
          </div>
        </div>
      </div>
    </div>

    <div class="is-center">
      <button class="button primary" @click="addCollaboratorsToRepo">Add Collaborators</button>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

export default {
  name: "AddCollaboratorsToRepo",
  components: {},
  props: ["repository", "hideModal", "alreadyCollaborators"],
  data() {
    return {
      search: "",
      sort: "not-sorted",
      collaboratorsOriginal: [],
      collaborators: [],
      selectedCollaborators: []
    };
  },
  created() {
    axios.get("/collaborators").then(res => {
      // Filter out the Repos user already has access to
      this.collaboratorsOriginal = res.data.filter(repo => {
        for (let i = 0; i < this.$props.alreadyCollaborators.length; i++) {
          if (this.$props.alreadyCollaborators[i].name === repo.name)
            return false;
        }
        return true;
      });
      this.collaborators = this.collaboratorsOriginal;
    });
  },
  watch: {
    search() {
      if (this.search === "") {
        this.collaborators = this.collaboratorsOriginal;
      } else {
        this.collaborators = this.collaboratorsOriginal.filter(collaborator =>
          collaborator.login.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    }
  },
  methods: {
    selectCollaborator(collab) {
      if (this.selectedCollaborators.includes(collab)) {
        this.selectedCollaborators = this.selectedCollaborators.filter(
          repoName => repoName !== collab
        );
      } else {
        this.selectedCollaborators.push(collab);
      }
    },
    addCollaboratorsToRepo() {
      if (this.selectedCollaborators.length > 0) {
        let data = {
          selectedCollaborators: this.selectedCollaborators
        };
        axios
          .put(`/repositories/${this.$props.repository.name}`, data)
          .then(res => {
            this.$message.success({
              message: res.data.message,
              position: "bottom-right",
              showClose: true
            });
            this.$props.hideModal();
          });
      } else {
        this.$message.error({
          message: "Please select Collaborators to Send Invitation",
          position: "bottom-right",
          showClose: true
        });
      }
    }
  }
};
</script>

<style lang="scss">
.collaborator-list-container {
  height: 400px;
  overflow-y: scroll;
}
</style>