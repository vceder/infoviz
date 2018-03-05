import Vue from "vue";
import Router from "vue-router";
import OverviewPlot from "./components/OverviewPlot.vue";
import ScatterPlot from "./components/ScatterPlot.vue";
import Intro from "./views/Intro.vue";
import Analytic from "./views/Analytic.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/intro"
    },
    {
      path: "/intro",
      name: "intro",
      component: Intro
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/analytic",
      name: "analytic",
      component: Analytic
    },
    {
      path: "/overview",
      name: "overview",
      component: OverviewPlot
    },
    {
      path: "/game/:id",
      name: "game",
      component: ScatterPlot
    },
    {
      path: "*",
      name: "else",
      redirect: "/intro"
    }
  ]
});
