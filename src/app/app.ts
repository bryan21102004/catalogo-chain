import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from './components/side-nav/side-nav';
import { Home } from './components/home/home';
import { Header } from './components/header/header';
import { NgIf } from '@angular/common'
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet,SideNav,Header,NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'catalogo-chain';
   mostrarMenu = false;
  constructor(private router: Router) {}

    toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
  irA(ruta: string) {
    this.router.navigate([`/${ruta}`]);
    this.mostrarMenu = false; 
  }
}

