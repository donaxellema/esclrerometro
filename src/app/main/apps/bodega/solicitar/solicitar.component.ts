import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { InventarioService } from '../../../../services/cruds/inventario.service';
import { SharedService } from '../../../../services/shared.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss']
})
export class SolicitarComponent implements OnInit {
  lista= DETAIL_DATA;
  listaInventario:any[]=[];

  constructor(
    private _inventarioService:InventarioService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getInventario();
  }

  getInventario(){
    this.listaInventario = this._inventarioService.getInventario();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

  openDialog() {
    this.dialog.open(DialogDataSolicitar, {
      data : this.listaInventario
    });
  }


  delete(po){
    var opcion = confirm("¿Esta seguro que quiere borrar la fila?");
    if (opcion == true) {
      this.lista.splice(po,1);
    }
  }

  generarSolicitud(){

  }

}

const DETAIL_DATA: tablaSolicitud[]=[];

export interface tablaSolicitud{
  fk_producto:number;
  solicitud_det_cantidad:number;
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'details-modal.html',
  styleUrls: ['./solicitar.component.scss']
})
export class DialogDataSolicitar {
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

