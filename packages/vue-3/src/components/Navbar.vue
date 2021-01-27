<template>
  <header class="app-bar row middle-xs">
    <router-link to="/" class="logo col-xs-10">Retain</router-link>
    <nav class="col-xs-2">
      <div class="row middle-xs between-xs">
        <router-link to="/about" class="link">About</router-link>
        <span class="link">Sign Out</span>
      </div>
    </nav>
  </header>
</template>


<style  scoped>
.app-bar {

  height: 65px;
  padding: 5px 30px;
  background-color: #00BCD4;
}
.logo {
  color: white;
  font-size: 30px;
  font-weight: 300;
  cursor: pointer;
}
.link {
  color: white;
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
}
</style>

