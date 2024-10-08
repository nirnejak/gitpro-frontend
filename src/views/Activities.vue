<template>
  <div class="columns">
    <Sidebar :show="showSidebar" />
    <div class="h-100vh mb-0" :class="{'column is-9': showSidebar, 'column px-30': !showSidebar}">
      <div class="px-20">
        <i
          class="fas cursor-pointer py-20"
          :class="{'fa-bars': !showSidebar, 'fa-times': showSidebar}"
          @click="showSidebar=!showSidebar"
        />
        <div class="columns">
          <div class="column">
            <h1 class="title is-size-3 has-text-black">Activities</h1>
          </div>
        </div>
        <div class="columns" v-if="formDataLoading">
          <div class="column">
            <SkeletonLoader width="100%" height="114px" radius="5px" class="my-10" />
          </div>
        </div>
        <div class="columns" v-if="!formDataLoading">
          <div class="column">
            <div class="box border-radius-5 p-20 my-10">
              <div class="columns">
                <div class="column is-6 repositories pr-10">
                  <p class="pb-5">Repository</p>
                  <multiselect
                    placeholder="Select Repository"
                    v-model="selectedRepo"
                    label="ownerAndRepo"
                    :options="repositories"
                    :show-labels="false"
                    :disabled="activityLoading"
                  />
                  <div class="mt-15">
                    <input type="checkbox" v-model="force" id="force" :disabled="activityLoading" />
                    <label for="force" class="has-text-dark ml-5">Fetch Latest(Force)</label>
                  </div>
                </div>
                <div class="column is-6 collaborator pr-10">
                  <p class="pb-5">Collaborator</p>
                  <multiselect
                    placeholder="Select Collaborator"
                    v-model="selectedCollaborator"
                    label="nameAndOrLogin"
                    :options="collaborators"
                    :show-labels="false"
                    :disabled="activityLoading"
                  />
                </div>
              </div>
              <div class="columns mt-10 sidebar-links" v-if="selectedRepo && selectedCollaborator">
                <div class="column is-4 has-text-centered">
                  <span
                    class="sidebar-link cursor-pointer"
                    :class="{active: date === 'yesterday'}"
                    @click="changeDate('yesterday')"
                  >Yesterday</span>
                </div>
                <div class="column is-4 has-text-centered">
                  <span
                    class="sidebar-link cursor-pointer"
                    :class="{active: date === 'today'}"
                    @click="changeDate('today')"
                  >Today</span>
                </div>
                <div class="column is-4 has-text-centered">
                  <span
                    class="sidebar-link cursor-pointer"
                    :class="{active: date === 'pick'}"
                    v-if="activityLoading"
                  >{{pickedDateFormatted || 'Pick a Date'}}</span>
                  <v-date-picker
                    v-model="pickedDate"
                    :popover="{ placement: 'bottom', visibility: 'click' }"
                    :max-date="new Date()"
                    v-if="!activityLoading"
                  >
                    <span
                      class="sidebar-link cursor-pointer"
                      :class="{active: date === 'pick'}"
                      @click="activityLoading ? null : date = 'pick'"
                    >{{pickedDateFormatted || 'Pick a Date'}}</span>
                  </v-date-picker>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activityLoading">
          <div class="columns" v-for="i in 2" :key="i">
            <div class="column">
              <SkeletonLoader width="100%" height="300px" radius="5px" class="my-10" />
            </div>
          </div>
        </div>

        <div class="columns" v-if="!activityLoading">
          <div class="column">
            <h3 class="is-size-5 title mt-20" v-if="Object.keys(activity).length !== 0">Commits</h3>
            <div v-if="Object.keys(activity).length !== 0">
              <div
                class="box border-radius-5 p-20 my-20"
                v-if="!activityLoading && activity.contributions.length === 0"
              >
                <div class="my-20">
                  <h4 class="has-text-centered is-size-6">No Contributions</h4>
                  <p class="has-text-dark has-text-centered">
                    No Activity on
                    <strong>{{selectedRepo.name}}</strong> by
                    <strong>{{selectedCollaborator.nameAndOrLogin}}</strong>
                  </p>
                  <p class="has-text-centered" v-if="activity.contributors.length > 0">
                    <br />Users with activity on
                    <strong>{{selectedRepo.name}}</strong> for selected date
                    <br />
                    <br />
                  </p>
                  <div class="has-text-centered">
                    <button
                      class="button is-info is-outlined bd-primary mx-10"
                      v-for="(contributor, index) in activity.contributors"
                      :key="index"
                      @click="selectedCollaborator = { login: contributor, nameAndOrLogin: contributor }"
                    >{{contributor}}</button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="box border-radius-5 p-20 my-20"
              v-for="(commit, index) in activity.contributions"
              :key="index"
            >
              <div class="columns">
                <div class="column is-9">
                  <h4 class="is-size-6 my-0">{{commit.commitMessage}}</h4>
                  <a
                    :href="`http://github.com/${activity.owner}/${activity.repository}/commit/${commit.hash}`"
                    class="has-text-dark"
                    target="_blank"
                    title="View Commit on GitHub"
                  >
                    {{commit.hash}}
                    <i class="fas fa-sm fa-external-link-alt" />
                  </a>
                </div>
                <div class="column is-3 has-text-right-tablet">
                  <i class="fas fa-code-branch" />&nbsp;
                  <span class="has-text-dark mr-20">{{commit.branch}}</span>
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
                <div v-if="!commit.isHidden" class="pt-20 has-text-centered">
                  <div
                    class="activity-container"
                    style="width: 100%;"
                    v-html="prettyHtml(commit.diff)"
                    v-if="commit.diff !== 'Error:Diff is too large'"
                  />
                  <h3
                    class="is-size-5 has-text-centered"
                    v-if="commit.diff === 'Error:Diff is too large'"
                  >Diff is too large</h3>
                  <a
                    :href="`http://github.com/${activity.owner}/${activity.repository}/commit/${commit.hash}`"
                    class="is-center"
                    target="_blank"
                    title="View Commit on GitHub"
                  >See commit on GitHub</a>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import momentTimezone from "moment-timezone";

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
        login: localStorage.login,
        name: localStorage.name,
        nameAndOrLogin: localStorage.name
          ? `${localStorage.name}(${localStorage.login})`
          : localStorage.login
      },
      tz: "",
      showSidebar: true,
      search: "",
      repositories: [],
      selectedRepo: null,
      collaboratorsOriginal: [],
      collaborators: [],
      selectedCollaborator: null,
      formDataLoading: true,
      activityLoading: false,
      date: "today",
      pickedDate: "",
      pickedDateFormatted: "",
      force: false,

      activity: {}
    };
  },
  async created() {
    // Set User Timezone
    let time = new Date();
    let timeZoneOffset = time.getTimezoneOffset();
    let timeZone = momentTimezone.tz.guess();
    this.tz = momentTimezone.tz.zone(timeZone).abbr(timeZoneOffset);

    const repositories_res = await axios.get("/repositories/");
    const collaborators_res = await axios.get("/collaborators/");
    this.repositories = repositories_res.data.map(repo => ({
      ...repo,
      ownerAndRepo: `${repo.owner}/${repo.name}`
    }));
    this.collaboratorsOriginal = collaborators_res.data.map(collaborator => ({
      ...collaborator,
      nameAndOrLogin: collaborator.name
        ? `${collaborator.name}(${collaborator.login})`
        : collaborator.login
    }));
    this.collaborators = this.collaboratorsOriginal;
    this.collaborators.push(this.user);
    this.formDataLoading = false;

    let collaborator = this.$router.history.current.query.collaborator;
    if (collaborator) {
      let collab = this.collaborators.filter(
        collab => collab.login === collaborator
      );
      if (collab.length > 0) this.selectedCollaborator = collab[0];
    }

    let repository = this.$router.history.current.query.repository;
    let owner = this.$router.history.current.query.owner;
    if (repository && owner) {
      let ownerAndRepo = `${owner}/${repository}`;
      let repo = this.repositories.filter(
        repo => repo.ownerAndRepo === ownerAndRepo
      );
      if (repo.length > 0) this.selectedRepo = repo[0];
    }
  },
  watch: {
    selectedRepo() {
      if (this.selectedRepo) {
        this.collaborators = this.collaboratorsOriginal.filter(collab => {
          if (collab.repositories) {
            return collab.repositories.includes(this.selectedRepo._id);
          } else {
            return false;
          }
        });
        this.collaborators.push(this.user);
        this.fetchActivity();
      } else {
        this.collaborators = this.collaboratorsOriginal;
        this.collaborators.push(this.user);
      }
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
  },
  methods: {
    changeDate(date) {
      if (this.activityLoading) return;

      this.date = date;
      this.pickedDate = "";
      this.pickedDateFormatted = "";
    },
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
          repository: this.selectedRepo.name,
          owner: this.selectedRepo.owner,
          after: moment(after).format("YYYY-MM-DD"),
          before: moment(before).format("YYYY-MM-DD"),
          tz: this.tz,
          force: this.force
        };
        axios
          .get(`/activities/${this.selectedCollaborator.login}`, { params })
          .then(res => {
            this.activityLoading = false;
            this.activity = res.data;
            this.activity.contributions = this.activity.contributions.map(
              commit => ({ ...commit, isHidden: true })
            );
          });
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