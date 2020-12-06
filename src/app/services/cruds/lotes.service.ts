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
export class LotesService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  
  getLotes(){
    var lotes = [{"pk_lote":"3","lote_numero":"AB24878", "lote_fechaelab":"2020-06-09", "lote_fechacad":"2021-06-09", "lote_estado":true, "producto_nombre":"Salbutamol"},
                       {"pk_lote":"4","lote_numero":"39236237", "lote_fechaelab":"2020-06-09", "lote_fechacad":"2021-06-09", "lote_estado":true, "producto_nombre":"Loratadina" }, 
                       {"pk_lote":"5","lote_numero":"L239898", "lote_fechaelab":"2020-06-09", "lote_fechacad":"2021-06-09", "lote_estado":true, "producto_nombre":"Paracetamol"} ]

    return lotes;

  }

  getLote(id){
    var lote = {"pk_lote":id, "fk_producto":3, "lote_numero":"AB24878", "lote_fechaelab":"2020-06-09", "lote_fechacad":"2020-01-22", "lote_estado":true};
  
    return lote;
  }
  
}
