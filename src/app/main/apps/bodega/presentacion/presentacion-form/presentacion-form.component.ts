import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresentacionesService } from '../../../../../services/cruds/presentaciones.service';

@Component({
  selector: 'app-presentacion-form',
  templateUrl: './presentacion-form.component.html',
  styleUrls: ['./presentacion-form.component.scss']
})
export class PresentacionFormComponent implements OnInit {
  presentacion:presentacionModel={
    presentacion_descri:null
  }

  op:string='';


  constructor(
    private _activatedRoute:ActivatedRoute,
    private _presentacionService:PresentacionesService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.presentacion = this._presentacionService.getPresentacion(parametro);
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
      console.log(this.presentacion);
    }else if(this.op == 'editar'){
      console.log(this.presentacion);
    }
    
  }

}

export interface presentacionModel{
  presentacion_descri:string,
}