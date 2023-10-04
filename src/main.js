import  {createApp} from 'vue'
import App from './App.vue'
import router from './router' 
import store from './store/store'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';  
import InputText from 'primevue/inputtext'; 
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';





const app = createApp(App);

app.component('DataTable', DataTable);
app.component('ColumnGroup', ColumnGroup);
app.component('ColumnComponent', Column);
app.component('RowComponent', Row);
app.component('InputText', InputText);
app.component('DividerComponent', Divider);
app.component('ButtonComponent', Button);
app.component('PasswordComponent', Password);
app.component('MenuBar', Menubar);
app.component('CardComponent', Card);
app.component('DialogComponent', Dialog);


import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css';
app.use(router)
app.use(store)
app.mount('#app')