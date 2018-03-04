import Vue from "vue";
import Router from "vue-router";
import OverviewPlot from "./components/OverviewPlot.vue";
import StreamPlot from "./components/StreamPlot.vue";
import About from "./views/About.vue";
import ThumbnailPlot from '@/components/ThumbnailPlot.vue';


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/overview"
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/overview",
      name: "overview",
      component: OverviewPlot
    },
    {
      path: "/streams",
      name: "streams",
      component: StreamPlot
    },
    {
      //Testar thumbnail
      path: "/thumb",
      name: "thumb",
      component: ThumbnailPlot
    }
  ]
});
