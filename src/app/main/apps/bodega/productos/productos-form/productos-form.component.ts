import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { ProductosService } from '../../../../../services/cruds/productos.service';
import { CategoriasService } from '../../../../../services/cruds/categorias.service';
import { MarcasService } from '../../../../../services/cruds/marcas.service';
import { PresentacionesService } from '../../../../../services/cruds/presentaciones.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit {
producto:productosModel={
  fk_categoria:null,
  fk_marca:null,
  fk_presentacion:null,
  producto_nombre:null,
  producto_nomgene:null,
  producto_regsani:null,
  producto_presentacion:null,
  producto_maximo:null,
  producto_minimo:null,
  producto_estado:null
}

op:string='';

controlCategoria = new FormControl();  
listaCategorias:any[]=[];
filteredCat: Observable<string[]>;

controlMarca = new FormControl();  
listaMarcas:any[]=[];
filteredMar: Observable<string[]>;

controlPresentacion = new FormControl();  
listaPresentaciones:any[]=[];
filteredPres: Observable<string[]>;



constructor(
    private _activatedRoute:ActivatedRoute,
    private _productoService:ProductosService,
    private _categoriaService:CategoriasService,
    private _marcaService:MarcasService,
    private _presentacionService:PresentacionesService,
  ) { }

  ngOnInit(): void {
    this.getListaCategorias();
    this.getListaMarca();
    this.getListaPresentacion();
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.producto = this._productoService.getProducto(parametro);
         /*this._proveedorService.getProveedores()
          .subscribe((resp:any) => {

          });*/
        
      }else{
        console.log('mensaje de error');
      }
    })

   
    this.filteredCat = this.controlCategoria.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategoria(value))
    );

    this.filteredMar = this.controlMarca.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMarca(value))
    );
     
    this.filteredPres = this.controlPresentacion.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPresentacion(value))
    );
  }


  getListaCategorias(){
    this.listaCategorias = this._categoriaService.getCategorias();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getListaMarca(){
    this.listaMarcas = this._marcaService.getMarcas();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getListaPresentacion(){
    this.listaPresentaciones = this._presentacionService.getPresentaciones();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  private _filterCategoria(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaCategorias.filter(option => option.categoria_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterMarca(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaMarcas.filter(option => option.marca_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterPresentacion(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaPresentaciones.filter(option => option.presentacion_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  displayCategoria(value?: number) {
    return value ? this.listaCategorias.find(_ => _.pk_categoria === value).categoria_descri : undefined;
  }

  displayMarca(value?: number) {
    return value ? this.listaMarcas.find(_ => _.pk_marca === value).marca_descri : undefined;
  }

  displayPresentacion(value?: number) {
    return value ? this.listaPresentaciones.find(_ => _.pk_presentacion === value).presentacion_descri : undefined;
  }
  


  accion(){
    console.log(this.op);
    if(this.op == 'nuevo'){
      console.log(this.producto);
    }else if(this.op == 'editar'){
      console.log(this.producto);
    }
    
  }

}

export interface productosModel{
  fk_categoria:number,
  fk_marca:number,
  fk_presentacion:number,
  producto_nombre:string,
  producto_nomgene:string,
  producto_regsani:string,
  producto_presentacion:number,
  producto_maximo:number,
  producto_minimo:number,
  producto_estado:any
}