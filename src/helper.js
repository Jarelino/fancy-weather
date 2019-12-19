/* eslint-disable no-param-reassign */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach((listener) => listener(arg));
    }
  }
}

function Save(name, data) {
  localStorage.setItem(name, data);
}

function Load(name) {
  return localStorage.getItem(name);
}

function F2C(numb) {
  return Math.round((numb - 32) / (9 / 5));
}

function C2F(numb) {
  return Math.round(((numb * 9) / 5) + 32);
}


export {
  EventEmitter, Save, Load, C2F, F2C,
};
