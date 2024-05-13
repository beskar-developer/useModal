import { toValue } from "vue";

const checkComposedPath = (element, event) =>
  element && (event.target === element || event.composedPath().includes(element));

const DEFAULT_HANDLER = () => {};
const DEFAULT_IGNORE = [];
const DEFAULT_CAPTURE = false;

const CONTEXT_MAPPER = {
  object: (value) => {
    const { handler = DEFAULT_HANDLER, ignore = DEFAULT_IGNORE } = value;

    return { handler, ignore };
  },
  function: (value) => {
    return { handler: value, ignore: DEFAULT_IGNORE };
  },
  default: () => {
    return { handler: DEFAULT_HANDLER, ignore: DEFAULT_IGNORE };
  },
};

const getContext = (value, { capture = DEFAULT_CAPTURE }) => {
  const valueType = typeof value;
  const mapper = CONTEXT_MAPPER[valueType] || CONTEXT_MAPPER.default;

  const context = { ...mapper(value), capture };
  return context;
};

const registerClickOutside = (element, context) => {
  const { handler, ignore, capture } = context;

  element.clickOutsideEvent = (event) => {
    const isInsideClicked = checkComposedPath(element, event);
    const isElementIgnored = ignore.some((element) => checkComposedPath(toValue(element), event));

    if (!isInsideClicked && !isElementIgnored) handler(event);
  };

  document.addEventListener("click", element.clickOutsideEvent, { capture });
};

const unRegisterClickOutside = (element, { capture }) => {
  document.removeEventListener("click", element.clickOutsideEvent, { capture });
};

export default {
  beforeMount(element, { value, modifiers }) {
    const context = getContext(value, modifiers);

    registerClickOutside(element, context);
  },

  unmounted(element, { value, modifiers }) {
    const context = getContext(value, modifiers);

    unRegisterClickOutside(element, context);
  },
};
