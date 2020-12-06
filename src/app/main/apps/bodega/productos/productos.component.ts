import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../../services/cruds/productos.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _productoService:ProductosService
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.lista = this._productoService.getProductos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }

}
