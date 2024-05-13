<template>
  <div class="wrapper">
    <button @click="open"> click me to open the modal</button>
    <div class="container" ref="containerElement"> this is a relavant container </div>
  </div>
</template>

<script setup>
  import { h, ref } from "vue";
  import { useModal } from "@/composables";

  const containerElement = ref();

  const { open } = useModal({
    component: h("div", ["i am an example!"]),
    popperOptions: {
      container: containerElement,
    },
    options: {
      props: {
        title: "hello",
      },
    },
  });
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    width: 100%;
    height: 100%;

    margin: 20px;
  }

  .container {
    width: 800px;
    background-color: #999999;

    padding: 10px;
  }

  /* reset */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    overflow: hidden;
  }

  html,
  body,
  div,
  span,
  object,
  iframe,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  code,
  em,
  img,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  b,
  u,
  i,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  main,
  canvas,
  embed,
  footer,
  header,
  nav,
  section,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-size-adjust: none;
  }

  footer,
  header,
  nav,
  section,
  main {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input {
    -webkit-appearance: none;
    border-radius: 0;
  }
</style>
