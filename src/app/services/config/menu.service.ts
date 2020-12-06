import { Injectable } from '@angular/core';
import { dominio_ws } from '../../config/configuraciones_globales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/operators'; 
import { TokenadminService } from '../tokenadmin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
    private router:Router, 
  ) { }



  getMenu(user){
   this._tokenAdminService.cargarValoresLocalStorage();
    let tkJwt = this._tokenAdminService.myToken;
    let headers = new HttpHeaders();
    headers = headers.set('token', tkJwt.token);
  
    let query;

    query={  
      json:{
        pk_user: user, 
      }
    }

    let url_query=this.url+'/getMenu';
    return this.http.post(url_query, query)
      .pipe(map((resp:any) =>{
          return resp;
        }))
    .pipe(catchError( err =>{      
          console.log('Error no controlado '+ JSON.stringify(err));
          return Observable.throw(err);
    }))
  }

  getMenuByRol(rol, pk_empresa, user_login){
    this._tokenAdminService.cargarValoresLocalStorage();
    let tkJwt = this._tokenAdminService.myToken;
    let headers = new HttpHeaders();
    headers = headers.set('token', tkJwt);
  
   let query;
   //arreglar setup - no llega pk_user y no se crea estructura de base de datos
   //3pm piphome
    
   query={
     rol:rol,
     pk_empresa:pk_empresa,
     user_login:user_login
   }
  
   let url_query=this.url+'/getMenuByPerfil';
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