import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../../services/cruds/inventario.service';

@Component({
  selector: 'app-inventariof',
  templateUrl: './inventariof.component.html',
  styleUrls: ['./inventariof.component.scss']
})
export class InventariofComponent implements OnInit {
  listaInventario:any[]=[];

  constructor(
    private _inventarioService:InventarioService,
  ) { }

  ngOnInit(): void {
    this.getInventario();
  }

  
  getInventario(){
    this.listaInventario = this._inventarioService.getInventarioFarmacia();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }


}
