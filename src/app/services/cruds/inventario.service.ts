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
export class InventarioService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }


  getInventario(){
       var listaInventario = [{"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"4", "producto_nombre":"Producto text of the printing",
       "producto_nomgene":"Producto1", "pk_lote":"22", "lote_numero":"Lote1", "lote_fechacad":"2021-02-12", "stock":"1045", "valor":"75.63"}];
  
       return listaInventario;
     }


  getInventarioFarmacia(){
     var listaInventario = [{"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"4", "producto_nombre":"Producto text of the printing",
     "producto_nomgene":"Producto1", "pk_lote":"22", "lote_numero":"Lote1", "lote_fechacad":"2021-02-12", "stock":"1045", "valor":"75.63"}];

     return listaInventario;  
  }


  getListaProductos(){
    var listaProductos = [{"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"4", "producto_nombre":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                           "producto_nomgene":"Producto1", "pk_lote":"22", "lote_numero":"Lote1", "lote_fechacad":"2021-02-12", "cantidad":"1"
                      ,    "vu":"1", "vt":"0", "iva":true},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"5", "producto_nombre":"Producto2",
                      "producto_nomgene":"Producto2", "pk_lote":"23", "lote_numero":"Lote2", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"6", "producto_nombre":"Producto3",
                      "producto_nomgene":"Producto3", "pk_lote":"24", "lote_numero":"Lote3", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"7", "producto_nombre":"Producto4",
                      "producto_nomgene":"Producto4", "pk_lote":"25", "lote_numero":"Lote4", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"8", "producto_nombre":"Producto5",
                      "producto_nomgene":"Producto5", "pk_lote":"26", "lote_numero":"Lote5", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"9", "producto_nombre":"Producto6",
                      "producto_nomgene":"Producto6", "pk_lote":"27", "lote_numero":"Lote6", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"10", "producto_nombre":"Producto7",
                      "producto_nomgene":"Producto7", "pk_lote":"28", "lote_numero":"Lote7", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"11", "producto_nombre":"Producto8",
                      "producto_nomgene":"Producto8", "pk_lote":"29", "lote_numero":"Lote8", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"12", "producto_nombre":"Producto10",
                      "producto_nomgene":"Producto9", "pk_lote":"30", "lote_numero":"Lote9", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"13", "producto_nombre":"Producto11",
                      "producto_nomgene":"Producto10", "pk_lote":"31", "lote_numero":"Lote10", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                   /*   {"pk_categoria":"3","categoria_descri":"Medicamentos", "pk_producto":"14", "producto_nombre":"Producto12",
                      "producto_nomgene":"Producto12", "pk_lote":"32", "lote_numero":"Lote11", "lote_fechacad":"2021-02-12", "cantidad":"1",
                          "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"4","categoria_descri":"Equipo Medico", "pk_producto":"15", "producto_nombre":"Producto13",
                      "producto_nomgene":"Producto13", "pk_lote":"33", "lote_numero":"Lote12", "lote_fechacad":"2021-02-12", "cantidad":"1",
                          "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"4","categoria_descri":"Equipo Medico", "pk_producto":"16", "producto_nombre":"Producto14",
                      "producto_nomgene":"Producto14", "pk_lote":"34", "lote_numero":"Lote13", "lote_fechacad":"2021-02-12", "cantidad":"1",
                          "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"4","categoria_descri":"Equipo Medico", "pk_producto":"17", "producto_nombre":"Producto15",
                      "producto_nomgene":"Producto15", "pk_lote":"35", "lote_numero":"Lote14", "lote_fechacad":"2021-02-12", "cantidad":"1",
                          "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"4","categoria_descri":"Equipo Medico", "pk_producto":"18", "producto_nombre":"Producto16",
                      "producto_nomgene":"Producto16", "pk_lote":"36", "lote_numero":"Lote15", "lote_fechacad":"2021-02-12", "cantidad":"1",
                          "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"5","categoria_descri":"Oficina", "pk_producto":"19", "producto_nombre":"Producto17",
                      "producto_nomgene":"Producto17", "pk_lote":"37", "lote_numero":"Lote16", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"5","categoria_descri":"Oficina", "pk_producto":"20", "producto_nombre":"Producto18",
                      "producto_nomgene":"Producto18", "pk_lote":"38", "lote_numero":"Lote17", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"5","categoria_descri":"Oficina", "pk_producto":"21", "producto_nombre":"Producto19",
                      "producto_nomgene":"Producto19", "pk_lote":"39", "lote_numero":"Lote18", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"5","categoria_descri":"Oficina", "pk_producto":"22", "producto_nombre":"Producto20",
                      "producto_nomgene":"Producto20", "pk_lote":"40", "lote_numero":"Lote19", "lote_fechacad":"2021-02-12", "cantidad":"1",
                            "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"5","categoria_descri":"Oficina", "pk_producto":"23", "producto_nombre":"Producto21",
                      "producto_nomgene":"Producto21", "pk_lote":"41", "lote_numero":"Lote20", "lote_fechacad":"2021-02-12", "cantidad":"1",
                            "vu":"1", "vt":"0", "iva":false},
                      {"pk_categoria":"5","categoria_descri":"Oficina", "pk_producto":"24", "producto_nombre":"Producto22",
                      "producto_nomgene":"Producto22", "pk_lote":"42", "lote_numero":"Lote21", "lote_fechacad":"2021-02-12", "cantidad":"1",
                           "vu":"1", "vt":"0", "iva":false} */                  
                    ];

    return listaProductos;
  }
}
