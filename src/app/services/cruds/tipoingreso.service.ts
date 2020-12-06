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
export class TipoingresoService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  getTiposIngresos(){
    var tipos = [{"pk_tipo_ingreso":"3","tipo_ingreso_descri":"Compra" ,"tipo_ingreso_estado":true },
                       {"pk_tipo_ingreso":"4","tipo_ingreso_descri":"Donación" ,"tipo_ingreso_estado":true}, 
                       {"pk_tipo_ingreso":"5","tipo_ingreso_descri":"Devolución" ,"tipo_ingreso_estado":true} ]

    return tipos;

  }

  getTipoIngreso(id){
    var tipo = {"pk_tipo_ingreso":"3","tipo_ingreso_descri":"Compra"};

    return tipo;
  }
}
