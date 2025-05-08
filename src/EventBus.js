import { reactive } from 'vue';

export const EventBus = reactive({
  events: {},
  $emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(({ callback, context }) => {
        callback.call(context, data);
      });
    }
  },
  $on(event, callback, context) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ callback, context });
  },
  $off(event, callback, context) {
    if (this.events[event]) {
      if (callback && context) {
        this.events[event] = this.events[event].filter(
          listener => listener.callback !== callback || listener.context !== context
        );
      } else if (context) {
        this.events[event] = this.events[event].filter(
          listener => listener.context !== context
        );
      }
    }
  },
  $offAll(context) {
    Object.keys(this.events).forEach(event => {
      this.events[event] = this.events[event].filter(
        listener => listener.context !== context
      );
    });
  }
});
