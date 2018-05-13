<template>
  <div  class="notification-counter" v-on:click="showNotifications">
    <i class="fas fa-exclamation notification-counter__icon"></i>
    <p class="notification-counter__text">Notifications({{ notifications }})</p>
  </div>
</template>

<script>
  import { eventBus } from '../main.js';

  export default {
    name: 'NotificationsCounter',

    props: {
      notifications: Number
    },

    methods: {
      showNotifications() {
        eventBus.$emit('displayNotifications', true);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/notification-counter.scss';
</style>
