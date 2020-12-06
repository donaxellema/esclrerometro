import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SharedService } from '../../../../../services/shared.service';
import { InventarioService } from '../../../../../services/cruds/inventario.service'; 
import { PacientesService } from '../../../../../services/farmacia/pacientes.service'; 
import { ServiciosService } from '../../../../../services/farmacia/servicios.service'; 

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.scss']
})
export class RecetaFormComponent implements OnInit {
  controlPaciente = new FormControl();
  listaPacientes:any[]=[];
  filteredPac: Observable<string[]>;
  
  controlServicio = new FormControl();
  listaServicios:any[]=[];
  filteredSer: Observable<string[]>;

  listaInventario:any[]=[];

  
  receta:recetaModel={
    receta_cab_servicio:null,
    receta_cab_paciente:null,
    receta_cab_medico:null,
    receta_cab_fechahora:null,
    receta_cab_advertencias:null,
    receta_cab_observacion:null,
    detalles:null,
  }

  lista= DETAIL_DATA;

  constructor(
    private _pacientesService:PacientesService,
    private _serviciosService:ServiciosService,
    private _inventarioService:InventarioService,
    public dialog: MatDialog,
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
    this.dialog.open(DialogDataReceta, {
      data : this.listaInventario
    });
  }

  delete(po){
    var opcion = confirm("¿Esta seguro que quiere borrar la fila?");
    if (opcion == true) {
      this.lista.splice(po,1);
    }
  }

  generarReceta(){
    this.receta.detalles = this.lista;
    console.log(this.receta);
  }


}


export interface tablaReceta{
  fk_lote:number;
  fk_producto:number;
  receta_det_cantidad:number;
  receta_det_viadmin:string;
  receta_det_dosis:string;
  receta_det_frecuencia:string;
  receta_det_duracion:string;
  receta_det_grado:string;
  receta_det_manana:string;
  receta_det_mediodia:string;
  receta_det_tarde:string;
  receta_det_noche:string;
}

export interface recetaModel{
  receta_cab_servicio:any;
  receta_cab_paciente:number;
  receta_cab_medico:any;
  receta_cab_fechahora:string;
  receta_cab_advertencias:any;
  receta_cab_observacion:any;
  detalles:any;
}

const DETAIL_DATA: tablaReceta[]=[];
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'details-modal.html',
  styleUrls: ['./receta-form.component.scss']

})

export class DialogDataReceta {
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
