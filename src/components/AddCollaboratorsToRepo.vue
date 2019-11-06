<template>
  <div>
    <div class="control has-icons-right">
      <input class="input" type="text" placeholder="Search Collaborator" v-model="search" />
      <span class="icon is-small is-right">
        <i class="fas fa-search" />
      </span>
    </div>
    <div class="columns mb-10 mt-15">
      <div class="column">
        <p class="has-text-dark">
          Collaborators
          <small>({{selectedCollaborators.length}} Selected)</small>
        </p>
      </div>
    </div>

    <div class="collaborator-list-container mb-15 p-10">
      <div class="columns is-multiline">
        <div
          class="column is-3 p-5"
          v-for="collaborator in collaborators"
          :key="collaborator.login"
          @click="selectCollaborator(collaborator.login)"
        >
          <div class="collaborator-avatar-container has-text-centered">
            <div class="has-text-center">
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
              <p class="mt-10 text-high-contrast">{{collaborator.name}}</p>
              <small class="has-text-dark is-center">{{collaborator.login}}</small>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="has-text-centered">
      <button class="button is-primary" @click="addCollaboratorsToRepo">Add Collaborators</button>
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
      // Filter out the Collaborators who already has access to the Repo
      this.collaboratorsOriginal = res.data.filter(collaborator => {
        for (let i = 0; i < this.$props.alreadyCollaborators.length; i++) {
          if (this.$props.alreadyCollaborators[i].login === collaborator.login)
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