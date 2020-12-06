import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../../../services/farmacia/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {
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
