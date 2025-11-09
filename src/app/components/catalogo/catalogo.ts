import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ProductoCard } from '../producto-card/producto-card';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoCard, NgIf, NgFor, CurrencyPipe],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'], 
})
export class Catalogo implements OnInit{
  productos: any[] = [];
  categoriaSeleccionada: string = 'Todos';
  productoSeleccionado: any = null;
  

  constructor(private http: HttpClient) {}


  ngOnInit() {
   // Detectar si está corriendo en local o en producción
  const isLocal = window.location.hostname === 'localhost';

  // Seleccionar base URL dependiendo del entorno
  const baseUrl = isLocal
    ? '/api'
    : 'https://opensheet.elk.sh';

  // URL completa a tu hoja y pestaña
  const sheetUrl = `${baseUrl}/1Blwb7em7sjWZ3bT1UXHZGlTxtSBaeGic7AJYDl0I6M/productos`;

  // Llamar a la API
  this.http.get(sheetUrl).subscribe({
    next: (data: any) => {
      console.log('✅ Datos cargados desde Sheets:', data);
      this.productos = data;
    },
    error: (err) => {
      console.error('❌ Error al cargar productos:', err);
    }
  });
  }



  get productosFiltrados() {
    if (!this.productos || this.productos.length === 0) return [];

    if (this.categoriaSeleccionada === 'Todos') return this.productos;

    return this.productos.filter((p) =>
      (p.categoria || '').toLowerCase() === this.categoriaSeleccionada.toLowerCase()
    );
  }

  cambiarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  OnInit() {
    const guardado = localStorage.getItem('categoria');
    if(guardado) this.categoriaSeleccionada = guardado;
    this.productosFiltrados;
  }

  abrirModal(producto: any) {
    this.productoSeleccionado = producto;
  }

  cerrarModal() {
    this.productoSeleccionado = null;
  }

  contactarWhatsApp(nombre: string) {
    const mensaje = encodeURIComponent(
      `¡Hola Cositas Sami! Vi el producto "${nombre}" en tu catálogo y me interesa.`
    );
    window.open(`https://wa.me/50664753875?text=${mensaje}`, '_blank');
  }
}
