<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Collaborators</h1>
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
                    class="bg-white rounded-circle bg-cover"
                    :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                  ></div>
                  <div class="overlay rounded-circle"></div>
                </div>
              </div>
              <p class="is-text-center mt-10 text-black">{{collaborator.name}}</p>
              <small class="is-text-center text-dark is-center">{{collaborator.login}}</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Collaborators",
  components: { Sidebar },
  data() {
    return {
      collaborators: [
        {
          name: "Jitendra Nirnejak",
          login: "nirnejak",
          avatar_url: "https://placedog.net/360/360¸"
        }
      ]
    };
  }
};
</script>