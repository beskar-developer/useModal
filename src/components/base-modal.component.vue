<template>
  <div class="modal">
    <header class="modal__header">
      <p class="modal__title">{{ title }}</p>

      <div icon-name="close-circle" @click="$emit('close')" class="modal__button">X</div>
    </header>

    <div class="modal__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: false,
    },
  });
</script>

<style lang="scss" scoped>
  $z-index: 100;

  .modal {
    border-radius: 6px;
    background-color: #ffffff;
    color: #333333;
    padding: 16px 12px;
    z-index: $z-index;

    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);

    &__header {
      display: flex;
      justify-content: space-between;
    }
    &__title {
      font-size: 18px;
    }
    &__button {
      cursor: pointer;
    }
  }
</style>
