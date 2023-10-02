import  {createApp} from 'vue'
import App from './App.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';  
import InputText from 'primevue/inputtext'; 
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Password from 'primevue/password';

               // optional

const app = createApp(App);

app.component('DataTable', DataTable);
app.component('ColumnGroup', ColumnGroup);
app.component('ColumnComponent', Column);
app.component('RowComponent', Row);
app.component('InputText', InputText);
app.component('DividerComponent', Divider);
app.component('ButtonComponent', Button);
app.component('PasswordComponent', Password);


import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css';

// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

app.mount('#app')