<template>
  <div class="row">
    <Sidebar :show="showSidebar" />
    <div class="h-100vh mb-0" :class="{'col-9-lg': showSidebar, 'col-12 px-30': !showSidebar}">
      <i
        class="fas cursor-pointer py-20"
        :class="{'fa-bars': !showSidebar, 'fa-times': showSidebar}"
        @click="showSidebar=!showSidebar"
      />
      <div class="row">
        <div class="col-12">
          <h1>Activities</h1>
        </div>
      </div>
      <div class="row" v-if="formDataLoading">
        <div class="col-12">
          <SkeletonLoader width="100%" height="114px" radius="5px" class="my-10" />
        </div>
      </div>
      <div class="row" v-if="!formDataLoading">
        <div class="col-12">
          <div class="bg-card border-radius-5 p-20 my-10">
            <div class="row">
              <div class="col-6-lg collaborator">
                <p class="pb-5">Collaborator</p>
                <multiselect
                  placeholder="Select Collaborator"
                  v-model="selectedCollaborator"
                  :options="collaborators"
                  :show-labels="false"
                />
                <div class="mt-15">
                  <input type="checkbox" v-model="force" id="force" />
                  <label for="force" class="text-dark ml-5">Fetch Latest(Force)</label>
                </div>
              </div>
              <div class="col-6-lg repositories">
                <p class="pb-5">Repository</p>
                <multiselect
                  placeholder="Select Repository"
                  v-model="selectedRepo"
                  :options="repositories"
                  :show-labels="false"
                />
              </div>
            </div>
            <div class="row mt-10 sidebar-links">
              <div class="col-4-lg text-center">
                <span
                  class="sidebar-link cursor-pointer"
                  :class="{active: date === 'yesterday'}"
                  @click="date = 'yesterday'; pickedDate = ''; pickedDateFormatted = ''"
                >Yesterday</span>
              </div>
              <div class="col-4-lg text-center">
                <span
                  class="sidebar-link cursor-pointer"
                  :class="{active: date === 'today'}"
                  @click="date = 'today'; pickedDate = ''; pickedDateFormatted = ''"
                >Today</span>
              </div>
              <div class="col-4-lg text-center">
                <v-date-picker
                  v-model="pickedDate"
                  :popover="{ placement: 'bottom', visibility: 'click' }"
                  :max-date='new Date()'
                >
                  <span
                    class="sidebar-link cursor-pointer"
                    :class="{active: date === 'pick'}"
                    @click="date = 'pick'"
                  >{{pickedDateFormatted || 'Pick a Date'}}</span>
                </v-date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="activityLoading">
        <div class="col-12" v-for="i in 2" :key="i">
          <SkeletonLoader width="100%" height="300px" radius="5px" class="my-10" />
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h3 class="mt-20">Commits</h3>
          <div class="bg-card border-radius-5 p-20 my-20" v-if="!activityLoading && activity.contributions.length === 0">
            <div class="my-20">
              <h4 class="text-center">No Contributions</h4>
              <p class="text-dark text-center">
                No Activity on <strong>{{selectedRepo}}</strong> by <strong>{{selectedCollaborator}}</strong>
              </p>
            </div>
          </div>
          <div class="bg-card border-radius-5 p-20 my-20" v-for="(commit, index) in activity.contributions" :key="index">
            <div class="row">
              <div class="col-11">
                <h4 class="my-0">{{commit.commitMessage}}</h4>
                <a
                  :href="`http://github.com/${user.login}/${activity.repository}/commit/${commit.hash}`"
                  class="text-dark"
                  target="_blank"
                  title="View Commit on GitHub"
                >
                  {{commit.hash}}
                  <i class="fas fa-sm fa-external-link-alt" />
                </a>
              </div>
              <div class="col-1 text-right">
                <i
                  class="fas fa-lg fa-minus-square cursor-pointer mt-10"
                  v-if="!commit.isHidden"
                  @click="commit.isHidden = !commit.isHidden"
                />
                <i
                  class="fas fa-lg fa-plus-square cursor-pointer mt-10"
                  v-if="commit.isHidden"
                  @click="commit.isHidden = !commit.isHidden"
                />
              </div>
            </div>
            <transition name="fade">
              <div v-if="!commit.isHidden" class="pt-20">
                <div class="activity-container" v-html="prettyHtml(commit.diff)" />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Diff2Html } from "diff2html";
import "diff2html/dist/diff2html.min.css";

import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import SkeletonLoader from "@/components/UI/SkeletonLoader";
import { watch } from "fs";

export default {
  name: "Activities",
  components: { Sidebar, SkeletonLoader },
  data() {
    return {
      user: {
        login: localStorage.login
      },
      showSidebar: true,
      search: "",
      repositories: [],
      selectedRepo: null,
      collaborators: [],
      selectedCollaborator: null,
      formDataLoading: true,
      activityLoading: false,
      date: "today",
      pickedDate: "",
      pickedDateFormatted: "",
      force: false,

      activity: []
    };
  },
  async created() {
    const repositories_res = await axios.get("/repositories/");
    const collaborators_res = await axios.get("/collaborators/");
    this.repositories = repositories_res.data.map(repo => repo.name);
    this.collaborators = collaborators_res.data.map(collab => collab.login);
    this.formDataLoading = false;

    let collaborator = this.$router.history.current.query.collaborator;
    if (collaborator && this.collaborators.includes(collaborator)) {
      this.selectedCollaborator = collaborator;
    }

    let repository = this.$router.history.current.query.repository;
    if (repository && this.repositories.includes(repository)) {
      this.selectedRepo = repository;
    }
  },
  methods: {
    fetchActivity() {
      if (this.selectedRepo && this.selectedCollaborator) {
        let before, after;
        if (this.date === "today") {
          before = new Date();
          after = new Date();
          after.setDate(after.getDate() - 1);
        } else if (this.date === "yesterday") {
          before = new Date();
          after = new Date();
          before.setDate(before.getDate() - 1);
          after.setDate(after.getDate() - 2);
        } else if (this.date === "pick") {
          before = new Date(this.pickedDate);
          after = new Date(this.pickedDate);
          after.setDate(after.getDate() - 1);
        }

        this.activityLoading = true;
        this.activity = [];

        let params = {
          repository: this.selectedRepo,
          after: moment(after).format("YYYY-MM-DD"),
          before: moment(before).format("YYYY-MM-DD"),
          force: this.force
        };
        axios.get(`/activities/${this.selectedCollaborator}`, { params })
        .then(res => {
          this.activityLoading = false;
          this.activity = res.data
          this.activity.contributions = this.activity.contributions.map(commit => ({
              ...commit,
              isHidden: false
            }))
        })
      }
    },
    prettyHtml(diff) {
      return diff
        ? Diff2Html.getPrettyHtml(diff, {
            inputFormat: "diff",
            showFiles: true,
            matching: "lines",
            outputFormat: "side-by-side"
          })
        : "";
    }
  },
  watch: {
    selectedRepo() {
      if (this.selectedRepo) this.fetchActivity();
    },
    selectedCollaborator() {
      if (this.selectedCollaborator) this.fetchActivity();
    },
    date() {
      if (this.date && this.date !== "pick") this.fetchActivity();
    },
    pickedDate() {
      if (this.pickedDate && typeof this.pickedDate !== "string")
        this.pickedDateFormatted = moment(this.pickedDate).format("DD-MM-YYYY");

      if (this.pickedDate && this.pickedDateFormatted !== "")
        this.fetchActivity();
    },
    force() {
      this.fetchActivity();
    }
  }
};
</script>

<style lang="scss">
.collaborator {
  input[type="text"].multiselect__input {
    transition: none !important;
    border: 0px !important;
  }
  .multiselect__tags {
    min-height: 43px;
  }
}
.repositories {
  input[type="text"].multiselect__input {
    transition: none !important;
    border: 0px !important;
  }
}

.multiselect__single {
  padding-top: 2px;
}

.multiselect__option--highlight,
.multiselect__tag {
  background: var(--color-primary);
  color: white !important;
}

.multiselect__tag-icon {
  background: transparent;
  &:focus,
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  &:after {
    color: white;
  }
}

.activity-container {
  td {
    padding: 0.1rem 0.4rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>