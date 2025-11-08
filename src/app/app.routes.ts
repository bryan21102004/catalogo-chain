import { Routes } from '@angular/router';
import{Home} from './components/home/home';
import {Catalogo} from './components/catalogo/catalogo';
import {Contacto} from './components/contacto/contacto';
import { Header } from './components/header/header';

export const routes: Routes = [
    {path : '', redirectTo : 'home', pathMatch : 'full'},
    {path : 'home', component : Home},
    {path : 'catalogo', component : Catalogo},
    {path : 'contacto', component : Contacto},
    {path: 'header', component: Header},
];
