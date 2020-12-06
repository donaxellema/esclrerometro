import { Component, OnInit } from '@angular/core';
import { EgresosService } from '../../../../services/cruds/egresos.service';

@Component({
  selector: 'app-egresosf',
  templateUrl: './egresosf.component.html',
  styleUrls: ['./egresosf.component.scss']
})
export class EgresosfComponent implements OnInit {
  listaEgresos:any[]=[];

  constructor(
    private _egresosService:EgresosService
  ) { }

  ngOnInit(): void {
    this.getEgresos();
  }

  getEgresos(){
    this.listaEgresos = this._egresosService.getEgresosF();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

}
