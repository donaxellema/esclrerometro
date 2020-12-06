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
export class RecetasService {
  url:string=dominio_ws;

  constructor(
    public http:HttpClient,
    private _tokenAdminService:TokenadminService,
  ) { }

  getReceta(){
    var receta = {
      "pk_receta_cab":2, "receta_cab_egreso":23, "receta_cab_servicio":3,
      "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0,
      "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
      "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0,
      "per_nombres":"Jose", "per_apellidopaterno":"Cedeño", "per_numeroidentificacion":"1715475456", 
      "estado":"Emitida", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro",
      "detalles":[{"pk_receta_det":1, "fk_receta_cab":2, "fk_lote":3, "fk_producto":2, "producto_nombre":"PARACETAMOL", "lote_numero":"327392",
      "receta_det_cantidad":2, "receta_det_viadmin":"2", "receta_det_dosis":"400MG", "receta_det_frecuencia":"3", "receta_det_duracion":"2",
      "receta_det_grado":"2", "receta_det_manana":"08:00", "receta_det_tarde":"14:00", "receta_det_noche":"-" }
      , {"pk_receta_det":2, "fk_receta_cab":2, "fk_lote":4, "fk_producto":3,"producto_nombre":"LORATADINA", "lote_numero":"323",
      "receta_det_cantidad":2, "receta_det_viadmin":"2", "receta_det_dosis":"300MG", "receta_det_frecuencia":"3", "receta_det_duracion":"2",
      "receta_det_grado":"2", "receta_det_manana":"08:00", "receta_det_tarde":"14:00", "receta_det_noche":"-"}
      ,{"pk_receta_det":3, "fk_receta_cab":2, "fk_lote":5, "fk_producto":6,"producto_nombre":"SALBUTAMOL", "lote_numero":"788787",
      "receta_det_cantidad":2, "receta_det_viadmin":"2", "receta_det_dosis":"600MG", "receta_det_frecuencia":"3", "receta_det_duracion":"2",  
      "receta_det_grado":"2", "receta_det_manana":"08:00", "receta_det_tarde":"14:00", "receta_det_noche":"-"}]
    }
    
    return receta;
  }


  getDevoluciones(){
    var devoluciones = [
      { "fk_receta_cab":2, "devol_receta_cab_fecha":"2020-10-22",  "per_nombres":"Katherine", "per_apellidopaterno":"Torres", "receta_cab_egreso":23, "receta_cab_servicio":3,
      "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0, "paciente": "Jose Cedeño",
      "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
      "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0, "per_numeroidentificacion":"1715475456", 
      "estado":"Emitida", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro"},
      { "fk_receta_cab":3, "devol_receta_cab_fecha":"2020-10-22",  "per_nombres":"Katherine", "per_apellidopaterno":"Torres", "receta_cab_egreso":23, "receta_cab_servicio":3,
      "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0, "paciente": "Juan Carlos Arriera",
      "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
      "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0, "per_numeroidentificacion":"1715475456", 
      "estado":"Emitida", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro"},
      { "fk_receta_cab":4, "devol_receta_cab_fecha":"2020-10-22",  "per_nombres":"Katherine", "per_apellidopaterno":"Torres", "receta_cab_egreso":23, "receta_cab_servicio":3,
      "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0, "paciente": "Alex Manzaba",
      "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
      "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0, "per_numeroidentificacion":"1715475456", 
      "estado":"Emitida", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro"}
    ];

    return devoluciones;
  }

  getRecetas(){
    var recetas = [
      { "pk_receta_cab":2, "receta_cab_egreso":23, "receta_cab_servicio":3,
        "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0,
        "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
        "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0,
        "per_nombres":"Jose", "per_apellidopaterno":"Cedeño", "per_numeroidentificacion":"1715475456", 
        "estado":"Emitida", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro",
      },
      { "pk_receta_cab":3, "receta_cab_egreso":23, "receta_cab_servicio":3,
      "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0,
      "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
      "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0,
      "per_nombres":"Jose", "per_apellidopaterno":"Cedeño", "per_numeroidentificacion":"1715475456", 
      "estado":"Despa", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro",
      },
      { "pk_receta_cab":4, "receta_cab_egreso":23, "receta_cab_servicio":3,
    "receta_cab_paciente":2, "receta_cab_medico":34, "receta_cab_userdes":0,
    "receta_cab_fechahora":"2020-02-12", "receta_cab_advertencias":"No frio", 
    "receta_cab_observacion":"Debe cuidarse", "receta_cab_esta":0,
    "per_nombres":"Jose", "per_apellidopaterno":"Cedeño", "per_numeroidentificacion":"1715475456", 
    "estado":"Emitida", "ser_descripcion":"Consulta Externa", "medico":"Juan Castro",
      }
      ]
  }


}
