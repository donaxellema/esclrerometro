import { Component, OnInit } from '@angular/core';
import { IngresosService } from '../../../../services/cruds/ingresos.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {
  listaIngresos:any[]=[];

  constructor(
    private _ingresosService:IngresosService
  ) { }

  ngOnInit(): void {
    this.getIngresos();
  }

  getIngresos(){
    this.listaIngresos = this._ingresosService.getIngresos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/   
  }

}
