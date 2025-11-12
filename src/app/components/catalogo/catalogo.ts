import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ProductoCard } from '../producto-card/producto-card';
import { NgIf, NgFor, CurrencyPipe,NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoCard, NgIf, NgFor, CurrencyPipe,NgClass],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'], 
})
export class Catalogo implements OnInit{
  productos: any[] = [];
  categoriaSeleccionada: string = 'Todos';
  productoSeleccionado: any = null;
  productosPorPagina = 5;
paginaActual = 1;
cargando = false;

get totalPaginas() {
  return Math.ceil(this.productosFiltrados.length / this.productosPorPagina);
}

get productosPaginados() {
  const inicio = (this.paginaActual - 1) * this.productosPorPagina;
  const fin = inicio + this.productosPorPagina;
  return this.productosFiltrados.slice(inicio, fin);
}



cambiarPagina(pagina: number) {
  if (pagina >= 1 && pagina <= this.totalPaginas) {
    this.cargando = true;

    setTimeout(() => {
      this.paginaActual = pagina;
      this.cargando = false;

      const main = document.querySelector('main');
      if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }
}

  constructor(private http: HttpClient) {}

 ngOnInit() {
    const hojaURL =
      'https://opensheet.elk.sh/1Blwb7em7sjWZ3bT1UXH2ZGlTxtSBaeGic7AJYDl0I6M/productos';
    const proxy =
      'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(hojaURL);

    this.http.get(proxy).subscribe({
      next: (data: any) => {
        try {
        
          console.log(' Productos cargados:', data);
          this.productos = data;
          this.paginaActual = 1; 
        } catch (e) {
          console.error(' Error al procesar datos:', e, data);
        }
      },
      error: (err) => {
        console.error(' Error al cargar productos:', err);
      },
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
  this.paginaActual = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
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
