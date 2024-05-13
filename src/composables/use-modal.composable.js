import { h, ref, render, toValue, Teleport, withDirectives } from "vue";
import { createPopper } from "@popperjs/core";
import { vClickOutside } from "@/directives";
import BaseModal from "@/components/base-modal.component.vue";

const ESCAPE_KEY = "Escape";
const DEFAULT_COMPONENT = "div";
const DEFAULT_OPTIONS = { escToClose: true, clickToClose: true };
const DEFAULT_POPPER_OPTIONS = {
  location: "bottom-end",
  teleportTo: "#app",
  strategy: "fixed",
  gainContainerWidth: true,
};
const DEFAULT_WRAPPER = BaseModal;

const useModal = ({ component = DEFAULT_COMPONENT, wrapper = DEFAULT_WRAPPER, options, popperOptions }) => {
  const isModalVisible = ref(false);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const mergedPopperOptions = {
    ...DEFAULT_POPPER_OPTIONS,
    ...popperOptions,
  };

  const setModalContext = (visibility, payload) => {
    const hasChanged = isModalVisible.value !== visibility;
    if (!hasChanged) return;

    isModalVisible.value = visibility;
    renderModal(payload);
    handleEsc();
  };

  const open = async (payload) => {
    const { onOpened, onBeforeOpen } = mergedOptions;
    if (onBeforeOpen) await onBeforeOpen(payload);

    setModalContext(true, payload);

    if (onOpened) await onOpened(payload);
  };

  const close = async (payload) => {
    const { onBeforeClose, onClosed } = mergedOptions;
    if (onBeforeClose) await onBeforeClose(payload);

    setModalContext(false, payload);

    if (onClosed) await onClosed(payload);
  };

  const toggle = async (payload) => {
    if (isModalVisible.value) await close(payload);
    else await open(payload);
  };

  const patch = (source, target) => {
    for (const [attrKey, attrValue] of Object.entries(target)) {
      source[attrKey] = attrValue;
    }

    return source;
  };

  const patchOptions = (options) => patch(mergedOptions, options);
  const patchPopperOptions = (options) => patch(mergedPopperOptions, options);

  const modalElement = ref(null);

  const getModalComponent = (payload) => {
    const { clickToClose, props } = mergedOptions;

    const directives = clickToClose ? [[vClickOutside, close, null, { capture: true }]] : [];

    const modal = () =>
      withDirectives(
        h(
          wrapper,
          {
            onClose: close,
            ref: modalElement,
            ...payload,
            ...props,
          },
          { default: () => h(component, { onClose: close, ...payload, ...props }) },
        ),
        directives,
      );

    return modal;
  };

  const getTeleportedModal = (containerElement, payload) => {
    const { teleportTo, gainContainerWidth } = mergedPopperOptions;
    const modal = getModalComponent(payload);
    const { width } = containerElement.getBoundingClientRect();

    const style = gainContainerWidth ? { width: `${width}px` } : {};

    return h(Teleport, { to: teleportTo }, [isModalVisible.value ? h(modal, { style }) : ""]);
  };

  const handlePopper = (containerElement) => {
    if (!isModalVisible.value) return;

    const { location } = mergedPopperOptions;

    createPopper(containerElement, modalElement.value.$el, {
      ...mergedPopperOptions,
      placement: location,
    });
  };

  const renderModal = (payload) => {
    const containerElement = toValue(mergedPopperOptions.container);

    if (containerElement) {
      render(getTeleportedModal(containerElement, payload), containerElement);

      handlePopper(containerElement);
    }
  };

  const escEventListener = (event) => {
    if (event.key !== ESCAPE_KEY) return;

    close();
  };

  const handleEsc = () =>
    window[`${isModalVisible.value ? "add" : "remove"}EventListener`]("keydown", escEventListener);

  return { open, close, toggle, patchOptions, patchPopperOptions };
};

export default useModal;
