import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import element from 'element-plus'
import App from './App.vue'

const app = createApp(App);
app.use(element);

app.mount('#app')
