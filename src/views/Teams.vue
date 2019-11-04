<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70">
      <div class="px-20">
        <h1 class="is-size-3">Teams</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Teams",
  components: { Sidebar }
};
</script>