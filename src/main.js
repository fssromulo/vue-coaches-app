import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBagde from "./components/ui/BaseBagde.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";

const vueApp = createApp(App);
vueApp.use(router);
vueApp.use(store);

vueApp.component("base-card", BaseCard);
vueApp.component("base-button", BaseButton);
vueApp.component("base-bagde", BaseBagde);
vueApp.component("base-spinner", BaseSpinner);
vueApp.component("base-dialog", BaseDialog);

vueApp.mount("#app");

