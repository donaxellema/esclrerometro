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
export class ProveedorService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  getProveedores(){
    var proveedores = [{"pk_proveedor":"3","proveedor_razon_social":"EquipMedic", "proveedor_ruc":"323232", "proveedor_telefono":"09545476", "proveedor_estado":true},
                       {"pk_proveedor":"4","proveedor_razon_social":"Laboratorios Firma","proveedor_ruc":"878787", "proveedor_telefono":"6590", "proveedor_estado":true }, 
                       {"pk_proveedor":"5","proveedor_razon_social":"Sumesa","proveedor_ruc":"089768", "proveedor_telefono":"8021", "proveedor_estado":true} ]

    return proveedores;

  }

  getProveedor(id){
    var proveedor = {"pk_proveedor":id, "proveedor_razon_social":"EquipMedic", "proveedor_ruc":"323232", "proveedor_telefono":"09545476", "proveedor_email":"equipmedic@hotmail.com",
                     "proveedor_estado":true, "proveedor_creacion":"hola", "proveedor_modificacion":"bb"};
  
    return proveedor;
  }
}
