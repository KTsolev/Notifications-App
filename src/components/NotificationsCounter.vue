<template>
  <div v-if="notifications" class="notification-counter" v-on:click="showNotifications">
    <i class="fas fa-exclamation notification-counter__icon"></i>
    <p class="notification-counter__text">Notifications({{ notifications }})</p>
  </div>
  <div v-else class="notification-counter notification-counter--new" v-on:click="createNew">
    <p class="notification-counter__text">New</p>
    <i class="fas fa-plus-circle notification-counter__icon"></i>
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
      },
      createNew() {
        eventBus.$emit('createNew', true);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/notification-counter.scss';
</style>
