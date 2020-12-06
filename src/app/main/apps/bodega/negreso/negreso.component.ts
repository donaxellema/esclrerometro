import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BodegaService } from '../../../../services/cruds/bodega.service';
import { TipoegresoService } from '../../../../services/cruds/tipoegreso.service';
import { SharedService } from '../../../../services/shared.service';
import { InventarioService } from '../../../../services/cruds/inventario.service';
import { ImprimirPdfService } from '../../../../services/config/imprimir-pdf.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Handlebars from 'handlebars/dist/cjs/handlebars';
import * as jsPDF from 'jspdf';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-negreso',
  templateUrl: './negreso.component.html',
  styleUrls: ['./negreso.component.scss']
})
export class NegresoComponent implements OnInit {
  controlBodega = new FormControl();
  listaBodegas:any[]=[];
  filteredBod: Observable<string[]>;

  controlTipo = new FormControl();
  listaTipo:any[]=[];
  filteredTipo: Observable<string[]>;

  listaInventario:any[]=[];

  negreso:negresoModel={
    negreso_bod_fecha:null,
    negreso_bod_user:null,
    negreso_bod_tipo:null,
    negreso_bod_total:null,
    negreso_bod_obser:null,
    negreso_bod_info:null,
    negreso_bod_depar:null,
    detalles:null,
  }

  lista= DETAIL_DATA;

  @ViewChild('content') content : ElementRef ;
  iframeSrc: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');



  constructor(
    private _bodegaService:BodegaService,
    private _tipoEgresoService:TipoegresoService,
    private _inventarioService:InventarioService,
    private _imprimirPdfService:ImprimirPdfService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.filteredBod = this.controlBodega.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBodegas(value))
    );

    this.filteredTipo = this.controlTipo.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTipos(value))
    );

    this.getBodegas();
    this.getTiposEgresos();
    this.getInventario();
  }


  getBodegas(){
    this.listaBodegas = this._bodegaService.getBodegas();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getTiposEgresos(){
    this.listaTipo = this._tipoEgresoService.getTiposEgresos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  getInventario(){
    this.listaInventario = this._inventarioService.getInventario();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }


  private _filterBodegas(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaBodegas.filter(option => option.bodega_descri.toLowerCase().indexOf(filterValue) === 0);
  }
  
  displayBod(value?: number) {
    return value ? this.listaBodegas.find(_ => _.pk_bodega === value).bodega_descri : undefined;
  }

  private _filterTipos(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaTipo.filter(option => option.tipo_egreso_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  displayTipo(value?: number) {
    return value ? this.listaTipo.find(_ => _.pk_tipo_egreso === value).tipo_egreso_descri : undefined;
  }

  openDialog() {
    this.dialog.open(DialogDataNegreso, {
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
  detegreso_bod_cantidad:number;
  detegreso_bod_vu:number;
  detegreso_bod_vt:number;
  producto_nombre:string;
  lote_numero:string;
}

export interface negresoModel{
  negreso_bod_fecha:any;
  negreso_bod_user:number;
  negreso_bod_tipo:number;
  negreso_bod_total:any;
  negreso_bod_obser:string;
  negreso_bod_info:any;
  negreso_bod_depar:any;
  detalles:any;
}

const DETAIL_DATA: tablaEgreso[]=[];
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'details-modal.html',
  styleUrls: ['./negreso.component.scss']

})
export class DialogDataNegreso {
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

