class Component {
  constructor() { }

  createElement(elemType, classNames = [], text, value) {
    const element = document.createElement(elemType);
    if (text) { element.textContent = text; }
    if (value) { element.value = value; }
    element.classList.add(...classNames);
    return element
  }
  removeClass(element, className) {
    element.classList.remove(className)
  }
  addClass(element, className) {
    element.classList.add(className)
  }
}