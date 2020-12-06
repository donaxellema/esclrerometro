import { Component, OnInit } from '@angular/core';
import { TipoingresoService } from '../../../../services/cruds/tipoingreso.service';
@Component({
  selector: 'app-tiposingreso',
  templateUrl: './tiposingreso.component.html',
  styleUrls: ['./tiposingreso.component.scss']
})
export class TiposingresoComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _tipoIngresoService:TipoingresoService
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  
  getLista(){
    this.lista = this._tipoIngresoService.getTiposIngresos();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }

}
