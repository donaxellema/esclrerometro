import { Component, OnInit } from '@angular/core';
import { PresentacionesService } from '../../../../services/cruds/presentaciones.service';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.scss']
})
export class PresentacionComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _presentacionesService:PresentacionesService
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.lista = this._presentacionesService.getPresentaciones();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }


}
