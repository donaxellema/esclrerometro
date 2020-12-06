import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../../../services/cruds/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _proveedorService:ProveedorService,
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.lista = this._proveedorService.getProveedores();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }

}
