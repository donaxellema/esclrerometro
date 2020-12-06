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
export class CategoriasService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  getCategorias(){
    var categorias = [{"pk_categoria":3, "categoria_descri":"MEDICAMENTOS", "categoria_medic":true, "categoria_iva":false, "categoria_estado":true},
                      {"pk_categoria":4, "categoria_descri":"MATERIALES DE OFICINA", "categoria_medic":true, "categoria_iva":false, "categoria_estado":true},
                      {"pk_categoria":5, "categoria_descri":"EQUIPOS MEDICOS", "categoria_medic":true, "categoria_iva":false, "categoria_estado":true}];

    return categorias;
  }

  getCategoria(id){
    var categoria = {"pk_categoria":3, "categoria_descri":"MEDICAMENTOS", "categoria_medic":true, "categoria_iva":false, "categoria_estado":true};

    return categoria;    
  }


}
