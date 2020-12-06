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
export class BodegaService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  getBodegas(){
    var bodegas = [{"pk_bodega":"3","bodega_descri":"Bodega General"},
                       {"pk_bodega":"4","bodega_descri":"Bodega 1"}, 
                       {"pk_bodega":"5","bodega_descri":"Bodega 2"} ]

    return bodegas;

  }

  getBodegasF(){
    var bodegas = [{"pk_bodega":"3","bodega_descri":"Bodega Farmacia"}];

    return bodegas;

  }
}
