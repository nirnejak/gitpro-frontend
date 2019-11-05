<template>
  <div class="modal-container" v-if="showModal">
    <div class="modal-bg" @click="hideModal" />
    <div class="modal-content">
      <div class="level">
        <div class="level-left">
          <h4 class="level-item is-size-6 title">{{modalTitle}}</h4>
        </div>
        <div class="level-right">
          <p class="level-item">
            <i class="fas fa-times cursor-pointer" @click="hideModal" />
          </p>
        </div>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["showModal", "hideModal", "modalTitle"],
  mounted() {
    document.addEventListener("keydown", this.escFunction, false);
  },
  updated() {
    document.addEventListener("keydown", this.escFunction, false);
  },
  unmounted() {
    if (document)
      document.removeEventListener("keydown", this.escFunction, false);
  },
  methods: {
    escFunction(event) {
      if (event.keyCode === 27 && this.$props.showModal) {
        this.$props.hideModal();
      }
    }
  }
};
</script>

<style lang="scss">
.modal-container {
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0px;
  left: 0px;
}

.modal-bg {
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 998;
  background: rgba(0, 0, 0, 0.6);
}

.modal-content {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;

  background: var(--card-background);
  padding: 20px;

  border-radius: 10px;
  transform: translate(-50%, -50%);

  animation-name: scaleUp;
  animation-duration: 0.7s;

  width: 50% !important;

  @media (max-width: 767px) {
    width: 80% !important;
  }
}

@keyframes scaleUp {
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>