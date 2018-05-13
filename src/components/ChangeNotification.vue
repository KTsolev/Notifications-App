<template>
  <div class="change-notification">
    <div class="change-motification__info">
      <label class="change-notification__label" for="type">infor for type</label>
      <input class="change-notification__imput" placeholder="infor for type" v-model="type"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="title">infor for title</label>
      <input class="change-notification__imput" placeholder="infor for title" v-model="title"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="text">infor for text</label>
      <input class="change-notification__imput" placeholder="infor for text" v-model="text"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="image">infor for image</label>
      <input class="change-notification__imput" placeholder="infor for image" v-model="image"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="requirement">infor for requirement</label>
      <input class="change-notification__imput" placeholder="infor for requirement" v-model="requirement"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="expires">infor for expires</label>
      <input class="change-notification__imput" placeholder="infor for expires" v-model="expires"/>
    </div>
    <div class="change-motification__action-area">
      <span class="change-notification__button">Update</span>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main.js';

  export default {
    name: 'ChangeNotification',

    props: {
      notification: Object
    },

    methods: {
      changedNotification() {
        eventBus.$emit('notificationChanged', true);
      },

      newdNotificationCreated() {
        eventBus.$emit('newNotification', true);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/change-notification.scss';
</style>
