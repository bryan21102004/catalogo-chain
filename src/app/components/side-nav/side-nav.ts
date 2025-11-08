import { Component,inject,signal } from '@angular/core';
 import{MatListModule} from '@angular/material/list'
 import { MatIconModule } from '@angular/material/icon';
 import { RouterModule } from '@angular/router'

 type MenuItem= {
  icon : string;
  label : string;
  route : string;
}

@Component({
  selector: 'app-side-nav',
  imports: [MatIconModule,MatListModule,RouterModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
menuItem=signal<MenuItem[]>([
  {
    icon : 'home',
    label : 'Inicio',
    route : 'home',
  },
    {
    icon : 'shopping_bag',
    label : 'Catálogo',
    route : 'catalogo',
  },
   {
    icon : 'contact_page',
    label : 'Contacto',
    route : 'contacto',
  },
]);
}
