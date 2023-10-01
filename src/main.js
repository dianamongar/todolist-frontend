import  {createApp} from 'vue'
import App from './App.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const app = createApp(App);

app.component('DataTable', DataTable);
app.component('ColumnGroup', ColumnGroup);
app.component('ColumnComponent', Column);
app.component('RowComponent', Row);

app.mount('#app')