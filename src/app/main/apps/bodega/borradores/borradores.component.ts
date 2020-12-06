import { Component, OnInit } from '@angular/core';
import { IngresosService } from '../../../../services/cruds/ingresos.service';

@Component({
  selector: 'app-borradores',
  templateUrl: './borradores.component.html',
  styleUrls: ['./borradores.component.scss']
})
export class BorradoresComponent implements OnInit {
  listaBorradores:any[]=[];

  constructor(
    private _ingresosService:IngresosService
  ) { }

  ngOnInit(): void {

    this.getBorradores();
  }

  getBorradores(){
    this.listaBorradores = this._ingresosService.getBorradores();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }
  

}
