import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../../../services/farmacia/recetas.service';

@Component({
  selector: 'app-misrecetas',
  templateUrl: './misrecetas.component.html',
  styleUrls: ['./misrecetas.component.scss']
})
export class MisrecetasComponent implements OnInit {
  listaRecetas:any[]=[];

  constructor(
    private _recetaService:RecetasService
  ) { }

  ngOnInit(): void {
    this.getRecetas();
  }

  getRecetas(){
    this.listaRecetas = this._recetaService.getDevoluciones();
     /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

}
