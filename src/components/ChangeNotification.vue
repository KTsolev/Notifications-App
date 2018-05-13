<template>
  <div class="change-notification">
    <div class="change-motification__header-actions">
      <i class="fas fa-times change-motification__icon" v-on:click="cancel"></i>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="type">infor for type</label>
      <input class="change-notification__imput" v-model:value="notification.type" placeholder="infor for type"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="title">infor for title</label>
      <input class="change-notification__imput" v-model:value="notification.title" placeholder="infor for title"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="text">infor for text</label>
      <input class="change-notification__imput" v-model:value="notification.text" placeholder="infor for text"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="image">infor for image</label>
      <input class="change-notification__imput" v-model:value="notification.image" placeholder="infor for image"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="requirement">infor for requirement</label>
      <input class="change-notification__imput" v-model:value="notification.reqirement" placeholder="infor for requirement"/>
    </div>
    <div class="change-motification__info">
      <label class="change-notification__label" for="expires">infor for expires</label>
      <input class="change-notification__imput" v-model:value="notification.expires" placeholder="infor for expires"/>
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
      itemUpdated() {
        eventBus.$emit('notificationChanged', true);
      },

      createNewItem() {
        eventBus.$emit('newNotification', true);
      },

      cancel () {
        eventBus.$emit('cancelUpdate', false);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/change-notification.scss';
</style>
