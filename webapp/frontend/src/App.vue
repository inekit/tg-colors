<template>
  <router-view />
</template>

<script>
export default {
  async mounted() {
    let foo = document.createElement('script');
    foo.setAttribute("src", "https://telegram.org/js/telegram-web-app.js");
    document.head.appendChild(foo);

    let nopinch = document.createElement('meta');
    nopinch.setAttribute("name", "viewport");
    nopinch.setAttribute("content", "width=device-width, user-scalable=no");
    document.head.appendChild(nopinch);
  },
  methods: {
  }
}
</script>

<style lang="scss">
html,
body {
  height: fit-content;
  overflow-x: hidden;
  background-color: white;
  background-color: var(--tg-theme-bg-color);

  .h-100 {
    height: 100vh;
    height: var(--tg-viewport-stable-height);
  }
}

#app {
  width: 100%;
  height: fit-content;
  top: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

h1 {
  margin: auto 1rem;
  margin-top: 1rem;
  color: #414141;
  color: var(--tg-theme-text-color);
  font-weight: 600;

}
</style>
