<template>
  <div id="app">
    <Header></Header>
    <router-view name="sideBar"></router-view>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma,
    'Hiragino Sans GB', STHeiti, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
}
         * {
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
*::before {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background-color: #e1e1e1;
}
</style>
