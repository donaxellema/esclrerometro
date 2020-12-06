import { Component, OnInit } from '@angular/core';
import { TipoegresoService } from '../../../../services/cruds/tipoegreso.service';

@Component({
  selector: 'app-tiposegreso',
  templateUrl: './tiposegreso.component.html',
  styleUrls: ['./tiposegreso.component.scss']
})
export class TiposegresoComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _tipoegresoService:TipoegresoService
  ) { }

  ngOnInit(): void {
    this.getLista();
  }


  getLista(){
    this.lista = this._tipoegresoService.getTiposEgresos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }


}
