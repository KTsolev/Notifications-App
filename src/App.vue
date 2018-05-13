<template>
  <div class="notifications-container">
    <notificationsCounter v-bind:notifications="newNotifications" title="CLick to view the notifications" />
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-bind:class="[showNotifications ? 'notifications-container notifications-container__list--expanded' : 'notifications-container notifications-container__list']">
      <notificationsTile
          v-bind:notifications="notifications"
          v-for="notification in notifications"
          v-bind:notification="notification" />
    </div>
  </div>
</template>

<script>
  import notificationsTile from './components/NotificationsTile.vue';
  import notificationsCounter from './components/NotificationsCounter.vue';
  import { eventBus } from './main.js';

  export default {
    components: {
      notificationsTile,
      notificationsCounter
    },

    data() {
        return {
            notifications: null,
            loading: false,
            error: null,
            showNotifications: false
        }
    },

    computed: {
      newNotifications: function() {
        const notifications = this.notifications;
        return notifications ? notifications.filter(notification =>
          notification.type.toLowerCase() !== 'bonus').length : 0;
      }
    },

    beforeRouteUpdate () {
      this.notifications = null;
      this.loading = true;
      this.error = null;
    },

    created() {
      this.loadData();
      eventBus.$on('displayNotifications', (toToggle) => {
        if( !toToggle ) {
          this.showNotifications = false;
        }

        this.showNotifications = true;
      });

      eventBus.$on('itemExpired', (item) => {
        const index = this.notifications.indexOf(item);
        this.notifications.splice(index, 1);

      });
    },

    methods: {
      loadData () {
        fetch(`http://localhost:8060/api/notifications/`)
          .then(response => response.json())
          .then(jsonResponce => {
            this.notifications = jsonResponce;
            this.loading = false;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles/main.scss';
</style>
