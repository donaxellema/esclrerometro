import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from '../../../../../services/cruds/proveedor.service';
@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.scss']
})
export class ProveedoresFormComponent implements OnInit {
  proveedor:proveedorModel={
    proveedor_razon_social:null,
    proveedor_ruc:null,
    proveedor_telefono:null,
    proveedor_email:null
  }

  op:string='';

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _proveedorService:ProveedorService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.proveedor = this._proveedorService.getProveedor(parametro);
         /*this._proveedorService.getProveedores()
          .subscribe((resp:any) => {

          });*/
        
      }else{
        console.log('mensaje de error');
      }
    })
  }


  accion(){
    if(this.op == 'nuevo'){
      console.log(this.proveedor);
    }else if(this.op == 'editar'){
      console.log(this.proveedor);
    }
    
  }

}

export interface proveedorModel{
  proveedor_razon_social:string;
  proveedor_ruc:string,
  proveedor_telefono:string,
  proveedor_email:string
}