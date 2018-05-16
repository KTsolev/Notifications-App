<template>
  <modalWindow v-if="showModal" v-bind:toToggleModalWindow="showModal"/>
  <div v-else class="notifications-container">
    <notificationsCounter title="CLick for new notifications" />
    <notificationsCounter v-bind:notifications="newNotifications" title="CLick to view the notifications" />
    <div v-bind:class="[showNotifications ? 'notifications-container notifications-container__list--visible' : 'notifications-container notifications-container__list']">
      <notificationsTile
          v-bind:notifications="notifications"
          v-for="notification in notifications"
          v-bind:key="notification.id"
          v-bind:notification="notification" />
    </div>
  </div>
</template>

<script>
  import notificationsTile from './components/NotificationsTile.vue';
  import notificationsCounter from './components/NotificationsCounter.vue';
  import modalWindow from './components/ModalWindow.vue';
  import { eventBus } from './main.js';

  export default {
    components: {
      notificationsTile,
      notificationsCounter,
      modalWindow
    },

    data() {
        return {
            notifications: null,
            showNotifications: false,
            showModal: false
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
      this.showModal = false;
    },

    created() {
      this.loadData();
      eventBus.$on('displayNotifications', (toToggle) => {
          this.showNotifications = toToggle;
      });

      eventBus.$on('itemExpired', (item) => {
        const index = this.notifications.indexOf(item);
        this.notifications.splice(index, 1);
      });

      eventBus.$on('createNew', (toToggle) => {
        this.showModal = toToggle;
      });

      eventBus.$on('hideModal', (toToggle) => {
        this.showModal = !toToggle;
      });

      eventBus.$on('itemCreated', (item) => {
         fetch(`http://localhost:8060/api/notifications/`,
         {
            method: 'POST',
            headers: {
             'content-type': 'application/json'
            },
            body: JSON.stringify(item)
         })
          .then((data) => {
            this.notifications.push(data);
          });
      });

      eventBus.$on('notificationChanged', (item) => {
         fetch(`http://localhost:8060/api/notifications/${item._id}`,
         {
            method: 'PUT',
            headers: {
             'content-type': 'application/json'
            },
            params: { notificationId: item._id },
            body: JSON.stringify(item)
         });
      });

      eventBus.$on('notificationDeleted', (item) => {

         fetch(`http://localhost:8060/api/notifications/${item._id}`,
         {
            method: 'DELETE',
            headers: {
             'content-type': 'application/json'
            },
            params: { notificationId: item._id },
         });
      });
    },

    methods: {
      loadData () {
        fetch(`http://localhost:8060/api/notifications/`)
          .then(response => response.json())
          .then(jsonResponce => {
            this.notifications = jsonResponce;
            console.log(this.notifications)
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles/main.scss';
</style>
