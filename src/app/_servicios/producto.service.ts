import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
export interface Producto {
  product_id: number;
  nombreProducto: string;
  precioUnitario: number;
  unidadesStock: number;
  categoria: number;
}

/* 
export const entorno = {
  HOST :'http://localhost:8080'
}
*/
 
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url: string= 'http://localhost:8080/productos';
 
  constructor(private http:HttpClient) { }
 
  obtenerTodos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url);
  }

  crearProducto(p:Producto): Observable<Producto>{
    console.log(p)
    return this.http.post<Producto>(this.url, p);
  }

  eliminarProducto(product_id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${product_id}`);
  }

}
