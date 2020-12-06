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
export class IngresosService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  getBorradores(){
    var listaBorradores = [{"pk_ningreso_bod":"3", "ningreso_bod_fechafac":"2020-09-21", "per_nombres":"Lenin", "per_apellidopaternos":"Vivanco", "ningreso_bod_user":"19", "ningreso_bod_acta":"123", "proveedor_razon_social":"Equipmedic"}];

    return listaBorradores;
  }


  getIngresos(){
    var listaIngresos = [{"pk_ningreso_bod":"3", "ningreso_bod_fechafac":"2020-09-21", "per_nombres":"Leonardo", "per_apellidopaternos":"De la Cruz", "ningreso_bod_user":"19", "ningreso_bod_acta":"123", "proveedor_razon_social":"Equipmedic"}];

    return listaIngresos;
  }
  
  
  getBorradoresF(){
    var listaBorradoresF = [{"pk_ningreso_far":"3", "ningreso_far_fecha":"2020-10-07",  "per_nombres":"Lenin", "per_apellidopaternos":"Vivanco", "ningreso_far_user":"19", "ningreso_far_tipo":1}];

    return listaBorradoresF;
  }


  getIngresosF(){
    var listaIngresosF = [{"pk_ningreso_far":"3",  "ningreso_far_fecha":"2020-10-07", "per_nombres":"Leonardo", "per_apellidopaternos":"De la Cruz", "ningreso_far_user":"19", "ningreso_far_tipo":1}];

    return listaIngresosF;
  }


}
