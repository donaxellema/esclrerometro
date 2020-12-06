import { Component, OnInit } from '@angular/core';
import { IngresosService } from '../../../../services/cruds/ingresos.service';

@Component({
  selector: 'app-borradoresf',
  templateUrl: './borradoresf.component.html',
  styleUrls: ['./borradoresf.component.scss']
})
export class BorradoresfComponent implements OnInit {
  listaBorradores:any[]=[];

  constructor(
    private _ingresosService:IngresosService
  ) { }

  ngOnInit(): void {
    this.getBorradores();
  }

  getBorradores(){
    this.listaBorradores = this._ingresosService.getBorradoresF();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }
}
