import { Component, OnInit } from '@angular/core';
import { EgresosService } from '../../../../services/cruds/egresos.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.scss']
})
export class EgresosComponent implements OnInit {
  listaEgresos:any[]=[];


  constructor(
    private _egresosService:EgresosService
  ) { }

  ngOnInit(): void {
    this.getEgresos();
  }


  getEgresos(){
    this.listaEgresos = this._egresosService.getEgresos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }



}
