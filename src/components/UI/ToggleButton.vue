<template>
  <div>
    <input
      class="tgl tgl-flat"
      type="checkbox"
      :id="id"
      v-model="isChecked"
      @change="$emit('change', $event.target.checked)"
    />
    <label class="tgl-btn" :for="id" />
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  props: ["id", "value"],
  data() {
    return {
      isChecked: this.$props.value
    };
  }
};
</script>

<style lang="scss">
.tgl {
  display: none;
}
.tgl,
.tgl:after,
.tgl:before,
.tgl *,
.tgl *:after,
.tgl *:before,
.tgl + .tgl-btn {
  box-sizing: border-box;
}
.tgl::-moz-selection,
.tgl:after::-moz-selection,
.tgl:before::-moz-selection,
.tgl *::-moz-selection,
.tgl *:after::-moz-selection,
.tgl *:before::-moz-selection,
.tgl + .tgl-btn::-moz-selection {
  background: none;
}
.tgl::selection,
.tgl:after::selection,
.tgl:before::selection,
.tgl *::selection,
.tgl *:after::selection,
.tgl *:before::selection,
.tgl + .tgl-btn::selection {
  background: none;
}
.tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 3.1em;
  height: 1.8em;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.tgl + .tgl-btn:after,
.tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}
.tgl + .tgl-btn:after {
  left: 0;
}
.tgl + .tgl-btn:before {
  display: none;
}
.tgl:checked + .tgl-btn:after {
  left: 50%;
}

.tgl-flat + .tgl-btn {
  padding: 2px;
  transition: all 0.2s ease;
  background: var(--card-background);
  border: 4px solid black;
  border-radius: 2em;
}
.tgl-flat + .tgl-btn:after {
  transition: all 0.2s ease;
  background: black;
  content: "";
  border-radius: 1em;
}
.tgl-flat:checked + .tgl-btn {
  border: 4px solid black;
}
.tgl-flat:checked + .tgl-btn:after {
  left: 50%;
  background: black;
}
</style>