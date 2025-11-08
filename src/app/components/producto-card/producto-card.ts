import { Component, EventEmitter, Output} from '@angular/core';
import { Input,output} from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-producto-card',
  imports: [CurrencyPipe],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCard {
@Input() producto!: any;
@Output() vermas= new EventEmitter<any>();

abrirDetalle(){
  this.vermas.emit(this.producto);
}
}

