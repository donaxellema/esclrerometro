import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoegresoService } from 'app/services/cruds/tipoegreso.service';

@Component({
  selector: 'app-tiposegreso-form',
  templateUrl: './tiposegreso-form.component.html',
  styleUrls: ['./tiposegreso-form.component.scss']
})
export class TiposegresoFormComponent implements OnInit {
  tipoingreso:tipoegresoModel={
    tipo_egreso_descri:null
  }

  op:string='';


  constructor(
    private _activatedRoute:ActivatedRoute,
    private _tipoegresoService:TipoegresoService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.tipoingreso = this._tipoegresoService.getTipoEgreso(parametro);
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
      console.log(this.tipoingreso);
    }else if(this.op == 'editar'){
      console.log(this.tipoingreso);
    }
    
  }


}


export interface tipoegresoModel{
  tipo_egreso_descri:string,
}
