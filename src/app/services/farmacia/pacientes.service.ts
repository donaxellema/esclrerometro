import { Injectable } from '@angular/core';
import { dominio_ws } from '../../config/configuraciones_globales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pairs } from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/operators'; 
import { TokenadminService } from '../tokenadmin.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  getPacientes(){
    var pacientes = [
      {"pac_id_pk":"36536", "nombres":"Jose Cedeño", "per_nombres":"Jose", "per_apellidopaterno":"Cedeño", "per_numeroidentificacion":"45787232"},
      {"pac_id_pk":"36535",  "nombres":"Cesar Lema", "per_nombres":"Cesar", "per_apellidopaterno":"Lema", "per_numeroidentificacion":"457843243"},
      {"pac_id_pk":"36532",  "nombres":"Alex Urrutia", "per_nombres":"Alex", "per_apellidopaterno":"Urrutia", "per_numeroidentificacion":"4324712"},
      {"pac_id_pk":"36533",  "nombres":"Juan Caicedo", "per_nombres":"Juan", "per_apellidopaterno":"Caicedo", "per_numeroidentificacion":"5454712"},
      {"pac_id_pk":"36533",  "nombres":"Estuardo Perez", "per_nombres":"Estuardo", "per_apellidopaterno":"Perez", "per_numeroidentificacion":"23232"},
    ];

    return pacientes;
  }          
}
