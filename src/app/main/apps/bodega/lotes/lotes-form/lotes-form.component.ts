import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { LotesService } from '../../../../../services/cruds/lotes.service';
import { ProductosService } from '../../../../../services/cruds/productos.service';

@Component({
  selector: 'app-lotes-form',
  templateUrl: './lotes-form.component.html',
  styleUrls: ['./lotes-form.component.scss']
})
export class LotesFormComponent implements OnInit {
 lote:loteModel={
    fk_producto:null,
    lote_numero:null,
    lote_fechaelab:null,
    lote_fechacad:null,
    lote_estado:null,
 }

  op:string='';

  controlProductos = new FormControl();  
  listaProductos:any[]=[];
  filteredProd: Observable<string[]>;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _loteService:LotesService, 
    private _productoService:ProductosService
  ) { }

  ngOnInit(): void {
    this.getListaProductos();
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.lote = this._loteService.getLote(parametro);
         /*this._proveedorService.getProveedores()
          .subscribe((resp:any) => {

          });*/
        
      }else{
        console.log('mensaje de error');
      }
    })

    this.filteredProd = this.controlProductos.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProductos(value))
    );
  }

  getListaProductos(){
    this.listaProductos = this._productoService.getProductos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  
  private _filterProductos(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaProductos.filter(option => option.producto_nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  displayProducto(value?: number) {
    return value ? this.listaProductos.find(_ => _.pk_producto === value).producto_nombre : undefined;
  }

  accion(){
    if(this.op == 'nuevo'){
      console.log(this.lote);
    }else if(this.op == 'editar'){
      console.log(this.lote);
    }
    
  }


}

export interface loteModel{
  fk_producto:number,
  lote_numero:string,
  lote_fechaelab:any,
  lote_fechacad:any,
  lote_estado:any,
}
