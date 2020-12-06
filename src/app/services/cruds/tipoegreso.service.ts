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
export class TipoegresoService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

    
  getTiposEgresos(){
    var tipos = [{"pk_tipo_egreso":"3","tipo_egreso_descri":"Despacho", "tipo_egreso_estado":true},
                       {"pk_tipo_egreso":"4","tipo_egreso_descri":"Donación", "tipo_egreso_estado":true}, 
                       {"pk_tipo_egreso":"5","tipo_egreso_descri":"Devolución", "tipo_egreso_estado":true } ]

    return tipos;

  }

  getTipoEgreso(id){
    var tipo = {"pk_tipo_egreso":"3","tipo_egreso_descri":"Despacho"};

    return tipo;
  }
}
