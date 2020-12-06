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
export class FinalizarSetupService {
  url:string=dominio_ws;
  my_user_pk:any;


  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  finalizarSetup(user, datos){
    this._tokenAdminService.cargarValoresLocalStorage();
    let tkJwt = this._tokenAdminService.myToken;
    let headers = new HttpHeaders();
    headers = headers.set('token', tkJwt);

    let query;

    datos.pk_user= user;

    query={  
      opcion: "I",
      json:datos,
      usuario:user
    }
  
  let url_query=this.url+'/setupdb';
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
