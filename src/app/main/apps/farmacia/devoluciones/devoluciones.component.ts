import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../../../services/farmacia/recetas.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss']
})
export class DevolucionesComponent implements OnInit {
  listaDevoluciones:any[]=[];

  constructor(
    private _recetaService:RecetasService

  ) { }

  ngOnInit(): void {
    this.getDevoluciones();
  }

  getDevoluciones(){
    this.listaDevoluciones = this._recetaService.getDevoluciones();
     /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

}
