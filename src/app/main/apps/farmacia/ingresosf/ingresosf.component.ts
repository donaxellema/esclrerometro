import { Component, OnInit } from '@angular/core';
import { IngresosService } from '../../../../services/cruds/ingresos.service';

@Component({
  selector: 'app-ingresosf',
  templateUrl: './ingresosf.component.html',
  styleUrls: ['./ingresosf.component.scss']
})
export class IngresosfComponent implements OnInit {
  listaIngresos:any[]=[];

  constructor(
    private _ingresosService:IngresosService
  ) { }

  ngOnInit(): void {
    this.getIngresos();
  }

  getIngresos(){
    this.listaIngresos = this._ingresosService.getIngresosF();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/   
  }
}
