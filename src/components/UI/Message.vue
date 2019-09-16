<template>
  <div class="card bg-error text-white" id="message-container" v-if="msg">
    {{msg}}
    <i class="fas fa-times pull-right mt-5 cursor-pointer" id="hide-message-btn"></i>
  </div>
</template>