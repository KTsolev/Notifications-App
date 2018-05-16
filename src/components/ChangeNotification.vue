<template>
  <div class="change-notification" v-if="notification">
    <div class="change-notification__header-actions">
      <i class="fas fa-times change-notification__icon" v-on:click="cancel"></i>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="type">type</label>
      <input class="change-notification__imput"  v-model:value="notification.type" placeholder="type"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="title">title</label>
      <input class="change-notification__imput"  v-model:value="notification.title" placeholder="title"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="text">text</label>
      <input class="change-notification__imput"  v-model:value="notification.text" placeholder="text"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="image">image</label>
      <input class="change-notification__imput"  v-model:value="notification.image" placeholder="image"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="requirement">requirement</label>
      <input class="change-notification__imput"  v-model:value="notification.reqirement" placeholder="requirement"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="link">link</label>
      <input class="change-notification__imput"  v-model:value="notification.link" placeholder="link"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="expires">expires</label>
      <input class="change-notification__imput"  v-model:value="notification.expires" placeholder="expires"/>
    </div>
    <div class="change-notification__action-area">
      <span class="change-notification__button change-notification__button--update" v-on:click="itemUpdated">Update</span>
    </div>
  </div>
  <div class="change-notification" v-else>
    <div class="change-notification__header-actions">
      <i class="fas fa-times change-notification__icon" v-on:click="hideModal"></i>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="type">type</label>
      <input class="change-notification__imput" v-model="inputValues.type" placeholder="type"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="title">title</label>
      <input class="change-notification__imput" v-model="inputValues.title" placeholder="title"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="text">text</label>
      <input class="change-notification__imput" v-model="inputValues.text" placeholder="text"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="image">image</label>
      <input class="change-notification__imput" v-model="inputValues.image" placeholder="image"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="requirement">requirement</label>
      <input class="change-notification__imput" v-model="inputValues.requirement" placeholder="requirement"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="link">link</label>
      <input class="change-notification__imput" v-model="inputValues.link" placeholder="link"/>
    </div>
    <div class="change-notification__info">
      <label class="change-notification__label" for="expires">expires</label>
      <input class="change-notification__imput" v-model="inputValues.expires" placeholder="expires"/>
    </div>
    <div class="change-notification__action-area">
      <span class="change-notification__button change-notification__button--create" v-on:click="itemCreated">Create</span>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main.js';

  export default {
    name: 'ChangeNotification',

    props: {
      notification: Object,
    },

    data() {
      return {
        inputValues: {
          type: null,
          title: null,
          text: null,
          image: null,
          link: null,
          requirement: null,
          expires: null
        }
      }
    },

    methods: {
      itemUpdated() {
        eventBus.$emit('notificationChanged', this.notification);
      },

      cancel () {
        eventBus.$emit('cancelUpdate', false);
      },

      hideModal () {
        eventBus.$emit('hideModal', true);
      },

      itemCreated() {
        eventBus.$emit('itemCreated', this.inputValues);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/change-notification.scss';
</style>
