import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TipoingresoService } from '../../../../services/cruds/tipoingreso.service';
import { BodegaService } from '../../../../services/cruds/bodega.service';
import { InventarioService } from '../../../../services/cruds/inventario.service'; 
import { ImprimirPdfService } from '../../../../services/config/imprimir-pdf.service';
import { SharedService } from '../../../../services/shared.service';
import { ParametrosService } from '../../../../services/cruds/parametros.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { not } from '@angular/compiler/src/output/output_ast';
import * as Handlebars from 'handlebars/dist/cjs/handlebars';

import * as jsPDF from 'jspdf';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-ningresof',
  templateUrl: './ningresof.component.html',
  styleUrls: ['./ningresof.component.scss']
})
export class NingresofComponent implements OnInit {
  controlTipo = new FormControl();
  listaTipo:any[]=[];
  filteredTipo: Observable<string[]>;

  controlBodega = new FormControl();
  listaBodegas:any[]=[];
  filteredBod: Observable<string[]>;

  mydate:any;
  listaProductos:any[]=[];

  public detallesNingreso:any[]=[];
  lista= DETAIL_DATA;

  iva:any=0;

  @ViewChild('content') content : ElementRef ;
  iframeSrc: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  ningreso:ningresoModel={
    fk_bodega:null,
    ningreso_far_fecha:null,
    ningreso_far_user:null,
    ningreso_far_tipo:null,
    ningreso_far_total:null,
    ningreso_far_stotal:null,
    ningreso_far_siva:null,
    ningreso_far_obser:null,
    ningreso_far_info:null,
    detalles:null,
  }

  clickEventsubscription:Subscription;

  constructor(
    public dialog: MatDialog,
    private _tipoIngresoService:TipoingresoService,
    private _bodegaService:BodegaService,
    private _inventarioService:InventarioService,
    private sharedService:SharedService, 
    private _parametrosService:ParametrosService,
    private sanitizer: DomSanitizer,
    private _imprimirPdfService:ImprimirPdfService 
  ) { }

  ngOnInit(): void {
    this.filteredTipo = this.controlTipo.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTipos(value))
    );

    this.filteredBod = this.controlBodega.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBodegas(value))
    );

    this.getTiposIngresos();
    this.getListaProductos();
    this.getBodegas();
  }

  
  getTiposIngresos(){
    this.listaTipo = this._tipoIngresoService.getTiposIngresos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getListaProductos(){
    this.listaProductos = this._inventarioService.getListaProductos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getBodegas(){
    this.listaBodegas = this._bodegaService.getBodegasF();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  private _filterTipos(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaTipo.filter(option => option.tipo_ingreso_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterBodegas(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaBodegas.filter(option => option.bodega_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  
  displayTipo(value?: number) {
    return value ? this.listaTipo.find(_ => _.pk_tipo_ingreso === value).tipo_ingreso_descri : undefined;
  }

  displayBod(value?: number) {
    return value ? this.listaBodegas.find(_ => _.pk_bodega === value).bodega_descri : undefined;
  }

  openDialog() {
    this.dialog.open(DialogDataNingresoF, {
      data : this.listaProductos
    });
  }

  generarIngreso(){
    this.ningreso.detalles = this.lista;
    console.log(this.ningreso);


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

  delete(po){
    var opcion = confirm("¿Esta seguro que quiere borrar la fila?");
    if (opcion == true) {
      this.lista.splice(po,1);
    }
  }

}

export interface tablaNingreso{
  fk_lote:number;
  detingreso_far_cantidad:number;
  detingreso_far_vu:number;
  detingreso_far_vt:number;
  producto_nombre:string;
  lote_numero:string;
}


export interface ningresoModel{
  fk_bodega:number;
  ningreso_far_fecha:any;
  ningreso_far_user:number;
  ningreso_far_tipo:number;
  ningreso_far_total:number;
  ningreso_far_stotal:string;
  ningreso_far_siva:any;
  ningreso_far_obser:string;
  ningreso_far_info:any;
  detalles:any;
}

const DETAIL_DATA: tablaNingreso[]=[];

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'details-modal.html',
  styleUrls: ['./ningresof.component.scss']

})
export class DialogDataNingresoF {
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