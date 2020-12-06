import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../../services/cruds/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  listaInventario:any[]=[];

  constructor(
    private _inventarioService:InventarioService,
  ) { }

  ngOnInit(): void {
    this.getInventario();
  }

  getInventario(){
    this.listaInventario = this._inventarioService.getInventario();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
  }

}
