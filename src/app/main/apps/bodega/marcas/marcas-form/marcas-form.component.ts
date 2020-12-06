import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarcasService } from '../../../../../services/cruds/marcas.service';

@Component({
  selector: 'app-marcas-form',
  templateUrl: './marcas-form.component.html',
  styleUrls: ['./marcas-form.component.scss']
})
export class MarcasFormComponent implements OnInit {
  marca:marcaModel={
    marca_descri:null
  }

  op:string='';

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _proveedorService:MarcasService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.marca = this._proveedorService.getMarca(parametro);
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
      console.log(this.marca);
    }else if(this.op == 'editar'){
      console.log(this.marca);
    }
    
  }

}

export interface marcaModel{
  marca_descri:string,
}
