<template>
  <div>
    <autocomplete
      :search="search"
      placeholder="Search for a User on Github"
      :get-result-value="getResultValue"
    >
      <template v-slot:result="{result, props}">
        <li v-bind="props" class>
          <div class="row cursor-pointer no-gutters">
            <div class="col-2">
              <div class="is-center">
                <div
                  class="rounded-circle bg-cover"
                  :style="`background-image: url(${result.avatar_url}); width: 50px; padding-top: 50px;`"
                ></div>
              </div>
            </div>
            <div class="col-10">
              <p class="m-0 p-0">{{result.login}}</p>
              <small class="text-dark" v-html="result.type"></small>
            </div>
          </div>
        </li>
      </template>
    </autocomplete>
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";

import axios from "@/configAxios";

export default {
  name: "AddCollaborator",
  props: ["showModal", "hideModal"],
  components: { Autocomplete },
  data() {
    return {
      selectedUser: {}
    };
  },
  watch: {
    search() {
      console.log(this.search);
    }
  },
  methods: {
    search(input) {
      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([]);
        } else {
          axios.get(`/fetch/users?q=${encodeURI(input)}`).then(res => {
            resolve(res.data);
          });
        }
      });
    },
    getResultValue(result) {
      this.selectedUser = result;
      return result.login;
    }
  }
};
</script>

<style lang="scss">
input.autocomplete-input {
  padding-left: 45px !important;
}
</style>