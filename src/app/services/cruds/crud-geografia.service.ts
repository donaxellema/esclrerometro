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
export class CrudGeografiaService {
  url:string=dominio_ws;



  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  consultaParametrosxTipo(opcion, geografia_tipo, fk_padre){
    this._tokenAdminService.cargarValoresLocalStorage();
    let tkJwt = this._tokenAdminService.myToken;
    let headers = new HttpHeaders();
    headers = headers.set('token', tkJwt);
  
   let query;
     
   query={
    opcion: opcion, 
    json:{ geografia_tipo: geografia_tipo, 
           fk_padre: fk_padre
         },
   }
  
   let url_query=this.url+'/geografia';
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