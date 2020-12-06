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
export class ParametrosService {
  url:string=dominio_ws;


  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,     
  ) { }


  getParametros(){
    var parametros = [{"pk_parametro":"3", "parametro_tipo":"iva","parametro_valor":0.12}]

    return parametros[0]["parametro_valor"];

  }

  consultaParametrosxTipo(opcion){
    this._tokenAdminService.cargarValoresLocalStorage();
    let tkJwt = this._tokenAdminService.myToken;
    let headers = new HttpHeaders();
    headers = headers.set('token', tkJwt);
  
   let query;
     
   query={
    opcion: opcion
   }
  
   let url_query=this.url+'/parametros_consulta';
    return this.http.post(url_query, query, {headers})
      .pipe(map((resp:any) =>{
         return resp;
       }))
      .pipe(catchError( err =>{      
         //console.log('Error no controlado '+ JSON.stringify(err));
         return Observable.throw(err);
     }))
  }



}
