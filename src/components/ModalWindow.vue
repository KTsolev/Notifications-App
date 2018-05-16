<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <changeNotification />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { eventBus } from '../main.js';
  import changeNotification from './ChangeNotification.vue';

  export default {
    name: 'ModalWindow',

    props: {
      toToggleModalWindow: false
    },

    components: {
      changeNotification
    },

    methods: {
      showNotifications() {
        eventBus.$on('toToggleModalWindow',(data) => {
          this.toToggleModalWindow = true;
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/modal-window.scss';
</style>
