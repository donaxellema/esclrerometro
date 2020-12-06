import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProveedorService } from '../../../../services/cruds/proveedor.service';
import { BodegaService } from '../../../../services/cruds/bodega.service';
import { TipoingresoService } from '../../../../services/cruds/tipoingreso.service';
import { InventarioService } from '../../../../services/cruds/inventario.service'; 
import { ImprimirPdfService } from '../../../../services/config/imprimir-pdf.service';
import { SharedService } from '../../../../services/shared.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { ParametrosService } from '../../../../services/cruds/parametros.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Handlebars from 'handlebars/dist/cjs/handlebars';

import * as jsPDF from 'jspdf';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-ningreso',
  templateUrl: './ningreso.component.html',
  styleUrls: ['./ningreso.component.scss']
})
export class NingresoComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  
  controlProveedores = new FormControl();  
  listaProveedores:any[]=[];
  filteredProd: Observable<string[]>;

  controlBodega = new FormControl();
  listaBodegas:any[]=[];
  filteredBod: Observable<string[]>;

  controlTipo = new FormControl();
  listaTipo:any[]=[];
  filteredTipo: Observable<string[]>;

  mydate:any;
  listaProductos:any[]=[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  public detallesNingreso:any[]=[];
  lista= DETAIL_DATA;

  animal: string = 'leon';
  name: string = 'lenin vivanco'; 

  iva:any=0;

  @ViewChild('content') content : ElementRef ;
  iframeSrc: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  
  ningreso:ningresoModel={
    fk_proveedor:null,
    fk_bodega:null,
    ningreso_bod_fecha:null,
    ningreso_bod_numfac:null,
    ningreso_bod_fechafac:null,
    ningreso_bod_user:null,
    ningreso_bod_tipo:null,
    ningreso_bod_acta:null,
    ningreso_bod_fileacta:null,
    ningreso_bod_total:0,
    ningreso_bod_stotal:0,
    ningreso_bod_siva:0,
    ningreso_bod_obser:null,
    ningreso_bod_info:null,
    detalles:null,
  }

  clickEventsubscription:Subscription;

  constructor(public dialog: MatDialog,
              private _proveedorService:ProveedorService,
              private _bodegaService:BodegaService,
              private _tipoIngresoService:TipoingresoService,
              private _inventarioService:InventarioService,
              private sharedService:SharedService, 
              private _parametrosService:ParametrosService,
              private sanitizer: DomSanitizer,
              private _imprimirPdfService:ImprimirPdfService ) { 


                this.clickEventsubscription=    this.sharedService.getClickEvent().subscribe(()=>{
                  this.calcular();
                })
              }


  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );


    this.filteredProd = this.controlProveedores.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProveedores(value))
    );
    
    this.filteredBod = this.controlBodega.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBodegas(value))
    );

    this.filteredTipo = this.controlTipo.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTipos(value))
    );

    this.getProveedores();
    this.getBodegas();
    this.getTiposIngresos();
    this.getListaProductos();
    this.getParametros();
  }

  getProveedores(){
    this.listaProveedores = this._proveedorService.getProveedores();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }


  getBodegas(){
    this.listaBodegas = this._bodegaService.getBodegas();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
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


  getParametros(){
    this.iva = this._parametrosService.getParametros();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterProveedores(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaProveedores.filter(option => option.proveedor_razon_social.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterBodegas(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaBodegas.filter(option => option.bodega_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterTipos(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaTipo.filter(option => option.tipo_ingreso_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  displayProv(value?: number) {
    return value ? this.listaProveedores.find(_ => _.pk_proveedor === value).proveedor_razon_social : undefined;
  }

  displayBod(value?: number) {
    return value ? this.listaBodegas.find(_ => _.pk_bodega === value).bodega_descri : undefined;
  }

  displayTipo(value?: number) {
    return value ? this.listaTipo.find(_ => _.pk_tipo_ingreso === value).tipo_ingreso_descri : undefined;
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
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
    this.calcular();
  }


  calcular(){
    var ntot=0;
    var stotm =0;
    var stivam =0;
    var valciva = 0;
    var valsiva = 0;
    var sbtiva = 0;

    var mul = 0;
    var x;

    for(x=0; x < this.lista.length; x++){
      if(this.lista[x]["iva"]){
        valciva = valciva + Number(this.lista[x]["cantidad"]) * Number(this.lista[x]["vu"]);
      }else{
        valsiva = valsiva + Number(this.lista[x]["cantidad"]) * Number(this.lista[x]["vu"]);
      }

      //mul = Math.round((Number(this.lista[x]["cantidad"]) *  Number(this.lista[x]["vu"]))*100)/100;
      mul = Number(this.lista[x]["cantidad"]) *  Number(this.lista[x]["vu"]);
      this.lista[x]["vt"] = mul.toFixed(4);
      //this.lista[x]["vt"] = Math.round(mul * 10000) /10000;

      sbtiva = Number(valciva) + Number(valciva * this.iva);
      
      ntot = Number(valsiva) + Number(sbtiva);
      stotm = Number(valsiva)+ Number(valciva);
      stivam = Number(valciva * this.iva);
    }

    this.ningreso.ningreso_bod_total =  ntot.toFixed(2);
    this.ningreso.ningreso_bod_stotal = stotm.toFixed(2);
    this.ningreso.ningreso_bod_siva = stivam.toFixed(2);
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


export interface tablaNingreso{
  fk_lote:number;
  detingreso_bod_cantidad:number;
  detingreso_bod_vu:number;
  detingreso_bod_vt:number;
  producto_nombre:string;
  lote_numero:string;
}

export interface ningresoModel{
  fk_proveedor:number;
  fk_bodega:number;
  ningreso_bod_fecha:any;
  ningreso_bod_numfac:number;
  ningreso_bod_fechafac:any;
  ningreso_bod_user:number;
  ningreso_bod_tipo:number;
  ningreso_bod_acta:string;
  ningreso_bod_fileacta:any;
  ningreso_bod_total:any;
  ningreso_bod_stotal:any;
  ningreso_bod_siva:any;
  ningreso_bod_obser:string;
  ningreso_bod_info:any;
  detalles:any;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const DETAIL_DATA: tablaNingreso[]=[];

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'details-modal.html',
  styleUrls: ['./ningreso.component.scss']

})
export class DialogDataExampleDialog {
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

