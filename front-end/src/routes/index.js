import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Medicine } from '../pages/Medicine';
import { Bill } from '../pages/Bill';
import { BillCreate } from '../pages/BillCreate';

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/medicines', component: Medicine },
  { path: '/bills', component: Bill },
  { path: '/bills/create', component: BillCreate },
];
