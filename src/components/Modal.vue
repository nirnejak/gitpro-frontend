<template>
  <div class="modal-container" v-if="showModal">
    <div class="modal-bg" @click="hideModal"></div>
    <div class="modal-content">
      <div class="modal-header pb-50">
        <div class="close-btn pull-right w-5 is-text-right pr-5">
          <i class="fas fa-times cursor-pointer" @click="hideModal"></i>
        </div>
        <h4 class="modal-title pull-right w-95">{{modalTitle}}</h4>
        <br />
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["showModal", "hideModal", "modalTitle"]
};
</script>

<style lang="scss">
.modal-container {
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0px;
  left: 0px;
}

.modal-bg {
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 998;
  background: rgba(0, 0, 0, 0.6);
}

.modal-content {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;

  background: white;
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