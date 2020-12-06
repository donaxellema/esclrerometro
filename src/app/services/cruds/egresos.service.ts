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
export class EgresosService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

    getBorradores(){
      var listaBorradores = [{"pk_negreso_bod":"3", "negreso_bod_fecha":"2020-09-21", "per_nombres":"Lenin", "per_apellidopaternos":"Vivanco", "negreso_bod_user":"19", "proveedor_bod_depar":"Emergencia"}];

      return listaBorradores;
    }

    getEgresos(){
      var listaEgresos = [{"pk_negreso_bod":"3", "negreso_bod_fecha":"2020-09-21", "per_nombres":"Lenin", "per_apellidopaternos":"Vivanco", "negreso_bod_user":"19", "proveedor_bod_depar":"Emergencia"}];

      return listaEgresos;
    }

    getBorradoresF(){
      var listaBorradores = [{"pk_negreso_far":"3", "negreso_far_fecha":"2020-09-21", "per_nombres":"Lenin", "per_apellidopaternos":"Vivanco", "negreso_far_user":"19", "ningreso_far_tipo":3}];

      return listaBorradores;
    }

    getEgresosF(){
      var listaEgresos = [{"pk_negreso_far":"3", "negreso_far_fecha":"2020-09-21", "per_nombres":"Lenin", "per_apellidopaternos":"Vivanco", "negreso_far_user":"19", "ningreso_far_tipo":3}];

      return listaEgresos;
    }



}
