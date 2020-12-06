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
export class MarcasService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  getMarcas(){
    var marcas = [{"pk_marca":3, "marca_descri":"SIN MARCA"  , "marca_estado":true},
                      {"pk_marca":4, "marca_descri":"TOSHIBA", "marca_estado":true},
                      {"pk_marca":5, "marca_descri":"GENIUS", "marca_estado":true}];

    return marcas;
  }

  getMarca(id){
    var marcas = {"pk_marca":5, "marca_descri":"GENIUS", "marca_estado":true};

    return marcas;    
  }


}
