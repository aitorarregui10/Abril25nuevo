import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_servicios/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Producto {
  product_id: number;
  nombreProducto: string;
  precioUnitario: number;
  unidadesStock: number;
  categoria: number;
}

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit{
  
  productos: Producto[] = [];
  nuevoProducto: Producto = { product_id: 0, nombreProducto: '', precioUnitario: 0, unidadesStock: 0, categoria: 0};

  constructor(private servicio: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.servicio.obtenerTodos().subscribe(data => {
      this.productos = data;
    });
  }

  altaProducto(): void {
    this.servicio.crearProducto(this.nuevoProducto).subscribe(() => {
      window.location.reload(); 
    });
  }

  eliminarProducto(product_id: number): void {
    this.servicio.eliminarProducto(product_id).subscribe(() => {
      window.location.reload(); 
    });
  }

  mostrarProductos: boolean = false;
  listar() {
    this.mostrarProductos = !this.mostrarProductos;
  }
}
