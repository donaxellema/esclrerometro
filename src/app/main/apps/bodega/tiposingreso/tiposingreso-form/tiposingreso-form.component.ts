import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoingresoService } from '../../../../../services/cruds/tipoingreso.service';

@Component({
  selector: 'app-tiposingreso-form',
  templateUrl: './tiposingreso-form.component.html',
  styleUrls: ['./tiposingreso-form.component.scss']
})
export class TiposingresoFormComponent implements OnInit {

  tipoingreso:tipoingresoModel={
    tipo_ingreso_descri:null
  }

  op:string='';

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _tipoingresoService:TipoingresoService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'insertar';
      }else if (parseInt(parametro) > 0){
        this.op = 'editar';
        this.tipoingreso = this._tipoingresoService.getTipoIngreso(parametro);
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

export interface tipoingresoModel{
  tipo_ingreso_descri:string,
}
