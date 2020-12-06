import { Component, OnInit } from '@angular/core';
import { MarcasService } from '../../../../services/cruds/marcas.service';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _marcasService:MarcasService
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.lista = this._marcasService.getMarcas();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }

}
