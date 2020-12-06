import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SharedService } from '../../../../services/shared.service';
import { InventarioService } from '../../../../services/cruds/inventario.service'; 
import { PacientesService } from '../../../../services/farmacia/pacientes.service'; 
import { ServiciosService } from '../../../../services/farmacia/servicios.service'; 
import { ImprimirPdfService } from '../../../../services/config/imprimir-pdf.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Handlebars from 'handlebars/dist/cjs/handlebars';
import * as jsPDF from 'jspdf';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-negresof',
  templateUrl: './negresof.component.html',
  styleUrls: ['./negresof.component.scss']
})
export class NegresofComponent implements OnInit {

  controlPaciente = new FormControl();
  listaPacientes:any[]=[];
  filteredPac: Observable<string[]>;
  
  controlServicio = new FormControl();
  listaServicios:any[]=[];
  filteredSer: Observable<string[]>;


  listaInventario:any[]=[];

  negreso:negresoModel={
    negreso_far_fecha:null,
    negreso_far_paciente:null,
    negreso_far_tipo:null,
    negreso_far_total:null,
    negreso_far_obser:null,
    negreso_far_info:null,
    negreso_far_servicio:null,
    detalles:null,
  }

  lista= DETAIL_DATA;
  
  @ViewChild('content') content : ElementRef ;
  iframeSrc: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');


  constructor(
    private _pacientesService:PacientesService,
    private _serviciosService:ServiciosService,
    private _inventarioService:InventarioService,
    private _imprimirPdfService:ImprimirPdfService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.filteredPac = this.controlPaciente.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPacientes(value))
    );

    this.filteredSer = this.controlServicio.valueChanges.pipe(
      startWith(''),
      map(value => this._filterServicios(value))
    );

    this.getPacientes();
    this.getServicios();
    this.getInventario();
  }


  getPacientes(){
    this.listaPacientes = this._pacientesService.getPacientes();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getServicios(){
    this.listaServicios = this._serviciosService.getServicios();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getInventario(){
    this.listaInventario = this._inventarioService.getInventarioFarmacia();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  private _filterPacientes(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaPacientes.filter(option => option.nombres.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterServicios(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaServicios.filter(option => option.ser_descripcion.toLowerCase().indexOf(filterValue) === 0);
  }

  displayPaciente(value?: number) {
    return value ? this.listaPacientes.find(_ => _.pac_id_pk === value).nombres : undefined;
  }

  displayServicios(value?: number) {
    return value ? this.listaServicios.find(_ => _.ser_id_pk === value).ser_descripcion : undefined;
  }

  openDialog() {
    this.dialog.open(DialogDataNegresoF, {
      data : this.listaInventario
    });
  }

  delete(po){
    var opcion = confirm("¿Esta seguro que quiere borrar la fila?");
    if (opcion == true) {
      this.lista.splice(po,1);
    }
  }

  generarEgreso(){
    this.negreso.detalles = this.lista;
    console.log(this.negreso);


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

export interface tablaEgreso{
  fk_bodega:number;
  fk_lote:number;
  detegreso_far_cantidad:number;
  detegreso_far_vu:number;
  detegreso_far_vt:number;
  producto_nombre:string;
  lote_numero:string;
}

export interface negresoModel{
  negreso_far_fecha:any;
  negreso_far_paciente:number;
  negreso_far_tipo:number;
  negreso_far_total:any;
  negreso_far_obser:string;
  negreso_far_info:any;
  negreso_far_servicio:any;
  detalles:any;
}

const DETAIL_DATA: tablaEgreso[]=[];
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'details-modal.html',
  styleUrls: ['./negresof.component.scss']

})
export class DialogDataNegresoF {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sharedService:SharedService) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  add(item){
    var indexOf = DETAIL_DATA.indexOf(item);
    if(indexOf < 0){
      DETAIL_DATA.push(item);
      this.sharedService.sendClickEvent();
    }
  }

  changePage(e){
    console.log(e);
  }

}