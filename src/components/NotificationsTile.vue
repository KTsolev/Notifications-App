<template>
  <changeNotification v-if="updateNotification" v-bind:notification="notification" />
  <div v-else v-bind:class="[toExpand
  ? 'notification-tile notification-tile--expanded'
    : 'notification-tile']" v-on:click="expand">
    <div v-if="notification.title" class="notification-tile__header-area">
      <h2 v-bind:class="[isBonus ? 'notification-tile__title notification-tile__title--bonus'
        : isPromotion ? 'notification-tile__title notification-tile__title--promotion' : 'notification-tile__title']">
        {{ notification.title }}
      </h2>
    </div>
    <div v-bind:class="[toExpand
    ? 'notification-tile__info-area notification-tile__info-area--expanded'
      : 'notification-tile__info-area']">
      <div class="notification-tile__image-area">
        <img v-if="notification.image" class="notification-tile__image" v-bind:src='notification.image' />
        <div class="notification-tile__text-area">
          <p class="notification-tile__text" v-if="notification.text">{{ notification.text }}</p>
          <p class="notification-tile__text" v-if="notification.requirement">{{ notification.requirement }}</p>
        </div>
      </div>
      <div class="notification-tile__link-area">
        <a v-if="notification.link" v-bind:href="notification.link">Link</a>
        <span v-if="notification.expires">{{ notification.expires }}</span>
      </div>
      <div class="notification-tile__action-area">
        <span class="notification-tile__button notification-tile__button--update" v-on:click="toToggleUpdate">Update</span>
        <span class="notification-tile__button notification-tile__button--delete">Delete</span>
      </div>
    </div>
  </div>
</template>

<script>
  import changeNotification from './ChangeNotification';

  import { eventBus } from '../main.js';

  export default {
    name: 'NotificationsTile',

    props: {
      notification: Object,
    },

    components: {
      changeNotification
    },

    data() {
        return {
          ticks:0,
          toExpand: false,
          updateNotification: false
        }
    },

    computed: {
      isBonus: function () {
          return this.notification.type.toLowerCase() === 'bonus';
        },

      isPromotion: function () {
          return this.notification.type.toLowerCase() === 'promotion';
        }
    },

    methods: {
       increment () {
         let expiresAfter = this.ticks;

         if ( this.notification.expires === undefined) {
           return;
         }

         if ( expiresAfter === this.notification.expires ) {
           return eventBus.$emit('itemExpired', this.notification);
         }
         this.ticks = ++expiresAfter;

         setTimeout(() => this.increment(), 3000);
       },

       expand () {
         if ( this.toExpand ) {
            this.toExpand = false;
         } else {
           this.toExpand = true;
         }
       },

       toToggleUpdate () {
         this.$emit('toToggleUpdate', true);
       }
     },

     created () {
       this.increment();
       this.$on('toToggleUpdate', (toToggleUpdate) => {
         this.updateNotification = toToggleUpdate;
       });

       eventBus.$on('cancelUpdate', (cancelUpdate) => {
         this.updateNotification = cancelUpdate;
       });
     }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/notification-tile.scss';
</style>
