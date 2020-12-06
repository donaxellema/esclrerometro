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
export class ServiciosService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  getServicios(){
    var servicios = [
      {"ser_id_pk":"1", "ser_descripcion":"CONSULTA EXTERNA", "ser_visible":true},
      {"ser_id_pk":"2", "ser_descripcion":"EMERGENCIA", "ser_visible":true},
      {"ser_id_pk":"3", "ser_descripcion":"HOSPITALIZACIÓN", "ser_visible":true}
    ];
    
    return servicios;
  }
}
