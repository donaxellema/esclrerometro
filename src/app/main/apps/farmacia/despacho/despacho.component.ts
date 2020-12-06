import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { RecetasService } from '../../../../services/farmacia/recetas.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Handlebars from 'handlebars/dist/cjs/handlebars';

import * as jsPDF from 'jspdf';
import { ImprimirPdfService } from '../../../../services/config/imprimir-pdf.service';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.scss']
})
export class DespachoComponent implements OnInit {
    lista:any={};

    @ViewChild('content') content : ElementRef ;
    iframeSrc: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  receta:recetaDespacho={
    pk_receta_cab:null,
    receta_cab_egreso:null,
    receta_cab_servicio:null,
    receta_cab_paciente:null,
    receta_cab_medico:null,
    receta_cab_userdes:null,
    receta_cab_fechahora:null,
    receta_cab_advertencias:null,
    receta_cab_observacion:null,
    per_nombres:null,
    per_apellidopaterno:null,
    per_numeroidentificacion:null,
    estado:null,
    ser_descripcion:null,
    medico:null,
  }
  
  constructor(
    private _recetasService:RecetasService,
    private sanitizer: DomSanitizer,
    private _imprimirPdfService:ImprimirPdfService
  ) { }

  ngOnInit(): void {
  }


  obtenerReceta(){ 
     this.lista =  this._recetasService.getReceta();
         /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  despacharReceta(){
    console.log(this.lista);

    
    var template = Handlebars.compile(this._imprimirPdfService.ningreso());
    var newContent = template({ doesWhat: "rocks!" });   
    
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element , renderer){
        return true ; 
      }
    };

    doc.fromHTML(newContent,15,15,{

      'width': 190,
      'elmentHandler':specialElementHandlers
    });
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(doc.output('datauristring'));
  }

}

export interface recetaDespacho{
  pk_receta_cab:number;
  receta_cab_egreso:number;
  receta_cab_servicio:number;
  receta_cab_paciente:number;
  receta_cab_medico:number;
  receta_cab_userdes:number;
  receta_cab_fechahora:any;
  receta_cab_advertencias:string;
  receta_cab_observacion:string;
  per_nombres:string;
  per_apellidopaterno:string;
  per_numeroidentificacion:string;
  estado:number;
  ser_descripcion:string;
  medico:string;
}