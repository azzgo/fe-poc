import "./styles/global.css";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routers = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: () => import("./pages/Home.vue") },
    { path: "/about", component: () => import("./pages/About.vue") },
  ],
});

var app = createApp(App);

app.use(routers);

app.mount("#app");




