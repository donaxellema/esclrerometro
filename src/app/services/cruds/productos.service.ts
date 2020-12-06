import { Injectable } from '@angular/core';
import { dominio_ws } from '../../config/configuraciones_globales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/operators'; 
import { TokenadminService } from '../tokenadmin.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  getProductos(){
    var productos = [{"pk_producto":"3", "fk_categoria":"3", "fk_presentacion":"3", "producto_nombre":"LORATADINA", "producto_estado":true,
                  "producto_presentacion":"2", "parametro_descri":"CAPSULA", "categoria_descri":"MEDICAMENTOS", "producto_regsani":"67687687"},
                {"pk_producto":"4", "fk_categoria":"3", "fk_presentacion":"3", "producto_nombre":"PARACETAMOL",  "producto_estado":true,
                  "producto_presentacion":"2", "parametro_descri":"CAPSULA", "categoria_descri":"MEDICAMENTOS", "producto_regsani":"67687687"},
                  {"pk_producto":"5", "fk_categoria":"3", "fk_presentacion":"3", "producto_nombre":"IBUPROFENO",  "producto_estado":true,
                  "producto_presentacion":"2", "parametro_descri":"CAPSULA", "categoria_descri":"MEDICAMENTOS", "producto_regsani":"67687687"},
                  {"pk_producto":"6", "fk_categoria":"3", "fk_presentacion":"3", "producto_nombre":"SALBUTAMOL",  "producto_estado":true,
                  "producto_presentacion":"2", "parametro_descri":"CAPSULA", "categoria_descri":"MEDICAMENTOS", "producto_regsani":"67687687"}]

    return productos;
  }


  getProducto(id){
    var lote = {"pk_producto":id, "fk_categoria":3, "fk_marca":3,"fk_presentacion":3, "producto_nombre":"LORATADINA", "producto_nomgene":"LORATADINA CC",
               "producto_regsani":"4543534", "producto_presentacion":3, "producto_maximo":3400, "producto_minimo":34, "producto_estado":true};
    return lote;
  }

}