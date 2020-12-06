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
export class CrudIndustriaService {
  url:string=dominio_ws;

  categoriaIndustrias:categoriasIndustria={
    pk_cate_industria:0,
    cate_idustria_nombre:null
  }


  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  consultaCategoriasIndustria(){
    this._tokenAdminService.cargarValoresLocalStorage();
    let tkJwt = this._tokenAdminService.myToken;
    let headers = new HttpHeaders();
    headers = headers.set('token', tkJwt);
  
   let query;
    
   query={
    opcion:"C"
   }
  
   let url_query=this.url+'/industria';
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

export interface categoriasIndustria{
  pk_cate_industria: number
  cate_idustria_nombre: string,
}
