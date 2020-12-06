import { Injectable } from '@angular/core';
import { dominio_ws } from '../config/configuraciones_globales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/operators'; 
import { TokenadminService } from './tokenadmin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { colorSets } from '@swimlane/ngx-charts/release/utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
    private router:Router, 
  ) { }


  auth(opcion:string,json:any):Observable<any>{
     let url_query=this.url+'/auth';
     return this.http.post(url_query,{opcion:opcion,json:json})
     .pipe(map((resp:any) =>{
         let dato={};
         if(resp.status === 'error'){
           //console.log(`Error en Register`,resp.respuesta.message,'error')
         }else{
           dato=resp;
         }
         if(dato["respuesta"].status == 1){
          var data = dato["respuesta"].data;
          var tokenU = dato["token"];

          this._tokenAdminService.limpiarTokenUser();
          this._tokenAdminService.crearTokenUsuarioLocalStorage(tokenU,data);
          this.router.navigate(['apps/esclerometro']);         
           return dato;
         }else{
          return dato;
         }   
       }))
       .pipe(catchError( err =>{
         //console.log(`Error no controlado`);
         return Observable.throw(err);
       }))  
  }

  logout(){
    this._tokenAdminService.limpiarTokenUser();
    this.router.navigate(['auth/login']); 
  }

}
