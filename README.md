# useModal Composable

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Introduction

The `useModal` Vue composition function provides a flexible way to manage modals in Vue.js applications. It abstracts away the complexities of modal management, including visibility toggling, event handling, and integration with the Popper.js library for positioning.

## Features

- Easily open, close, or toggle the visibility of modals.
- Customize modal behavior with options such as `escToClose` and `clickToClose`.
- Seamlessly integrate with different modal components and wrappers.
- Control the positioning of modals using Popper.js with customizable options.

## Installation

To use `useModal`, ensure Vue.js is installed in your project. Then, import the `useModal` function into your Vue component.

```javascript
import { ref } from "vue";
import { useModal } from "@/composables";

export default {
  setup() {
    const { open, close } = useModal({
      // Customize options if needed
    });

    return { open };
  },
};
```

## API

```javascript
const { open, close, toggle, patchOptions, patchPopperOptions } = useModal({
  // The component to render inside the modal
  component: VueComponent,
  //The wrapper component for the modal
  wrapper: VueComponent,
  options: {
    // Optional: Whether pressing the escape key should close the modal
    escToClose: true,
    /// Optional: Whether clicking outside the modal should close it
    clickToClose: true,
    // Callback function called before opening the modal
    onBeforeOpen: async (payload) => {},
    // Optional: Callback function called after opening the modal
    onOpened: async (payload) => {},
    // Optional: Callback function called before closing the modal
    onBeforeClose: async (payload) => {},
    // Optional: Callback function called after closing the modal
    onClosed: async (payload) => {},
    // Optional: Additional props to pass to the modal component and wrapper component
    props: {},
  },
  //  read popper js documantation for this part
  popperOptions: {
    // Optional: Initial placement of the modal relative to the trigger element
    location: "bottom-end",
    // Optional: Selector or element to which the modal should be teleported
    teleportTo: "#app",
    // Optional: Strategy for handling modal positioning
    strategy: "fixed",
    // Optional: Whether the modal should match the width of its container
    gainContainerWidth: true,
    // Optional: Selector or element for the container of the modal
    container: htmlElement | refElement,
  },
});
```

## context

```javascript
/* change the modal visibility and receive 
Optional data to pass to the modal component and wrapper component as props and lifecycle hooks.
*/
open(payload);
close(payload);
toggle(payload);
patchOptions(options);
patchPopperOptions(options);
```

## Events

emiting close event from wrapper component or modal component will close the modal

```javascript
emit("close");
```
