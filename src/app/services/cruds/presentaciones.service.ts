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
export class PresentacionesService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  getPresentaciones(){
    var presentaciones = [{"pk_presentacion":3, "presentacion_descri":"CAPSULA" , "presentacion_estado":true},
                      {"pk_presentacion":4, "presentacion_descri":"LIQUIDO ORAL", "presentacion_estado":true},
                      {"pk_presentacion":5, "presentacion_descri":"COMPRIMIDO", "presentacion_estado":true}];

    return presentaciones;
  }


  getPresentacion(id){
    var presentacion = {"pk_presentacion":5, "presentacion_descri":"COMPRIMIDO", "presentacion_estado":true};

    return presentacion;
  }


}
