import { Component, OnInit,Inject,HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsclerometroService } from '../../../services/esclerometro.service';
import { TokenadminService } from '../../../services/tokenadmin.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-esclerometro-form',
  templateUrl: './esclerometro-form.component.html',
  styleUrls: ['./esclerometro-form.component.scss']
})
export class EsclerometroFormComponent implements OnInit {
 
  animal: string;
  name: string;


esclerometro:esclerometroModel={
  pk_esclerometro:null,
  escle_provincia:null,
  escle_ciudad:null,
  escle_parroquia:null,
  escle_zona:null,
  escle_sector:null,
  escle_manzana:null,
  escle_predio:null,
  escle_prop_horizontal:null,
  escle_derech_acentamiento:null,
  escle_urb_coop_barrio:null,
  escle_calle_av:null,
  escle_fecha:null,
  escle_elemento:null,
  escle_resistencia:null,
  escle_tp_martillo:"Esclerómetro PCE-HT 225A / PCE-HT 75 ",
  escle_fech_calibr:null,
  escle_orientacion:null,
  escle_lectura_reb:{"valores": [{val:0}, {val:0}, {val:0}, {val:0},
                     {val:0}, {val:0}, {val:0}, {val:0}, {val:0}, {val:0} 
                     , {val:0}, {val:0}]},
  escle_promedio:null,
  escle_desviacio:null,
  escle_observacion:null,
  escle_promed_corre:null,
  escle_fc_tabla:null,
  escle_dispercion:null,
  escle_creacion:null,
  escle_modificacion:null,
  json_corregido: [{val:0}, {val:0}, {val:0}, {val:0},
    {val:0}, {val:0}, {val:0}, {val:0}, {val:0}, {val:0} 
    , {val:0}, {val:0}]
}

op:string='';
codigo:number=0;
guardando:any=false;
loaded:any=false;



  constructor(
    private _activatedRoute:ActivatedRoute,
    private _esclerometroService:EsclerometroService,
    private _router:Router,
    private _tokenAdminService:TokenadminService,
    public dialog: MatDialog
  ) { }


  /*openDialog(objeto): void { 

    const dialogRef = this.dialog.open(DialogMedidaComponent, {
      data: objeto,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }*/

  
  openDialog(objeto) {
    this.dialog.open(DialogMedidaComponent, {
      data : objeto,
    });
  }


  ngOnInit(): void {
    this.loaded = false;
    this._activatedRoute.paramMap.subscribe((data)=>{
      let parametro = data['params'].id;
      if(parametro == 'nuevo'){
        this.op = 'I';
        this.loaded = true;
      }else if (parseInt(parametro) > 0){
        this.op = 'E';
        this.esclerometro.pk_esclerometro = parametro;
         this._esclerometroService.apiEsclerometro("E", this.esclerometro)
          .subscribe((resp:any) => {
            this.esclerometro = resp.respuesta.data[0];
            this.codigo=parametro;
            console.log(this.esclerometro);
            let datax = this._tokenAdminService.decryptData(this._tokenAdminService.myUser);
            
          
            this.esclerometro.escle_modificacion = {"user": datax.pk_user, "fecha": new Date()};
            this._esclerometroService.apiEsclerometro("U", this.esclerometro)
              .subscribe((resp:any) => {
                this.loaded = true;
                this.esclerometro = resp.respuesta.data;
                this.esclerometro.escle_elemento = Number(resp.respuesta.data.escle_elemento);
                this.esclerometro.escle_resistencia = Number(resp.respuesta.data.escle_resistencia);
                this.esclerometro.escle_orientacion = Number(resp.respuesta.data.escle_orientacion);
              });
          });
      }else{
        console.log('mensaje de error');
      }
    })
  }

  

  accion(){
    let data = this._tokenAdminService.decryptData(this._tokenAdminService.myUser);
    this.guardando = true;
    if(this.op == 'I'){
      this.esclerometro.escle_creacion = {"user": data.pk_user, "fecha": new Date()};
      this._esclerometroService.apiEsclerometro("I", this.esclerometro)
      .subscribe((resp:any) => {
        this.guardando = false;
        if(resp.respuesta.status == "ok"){
          //console.log(resp.respuesta)
          this.openDialog(resp.respuesta.data);
          //var r = confirm("Registro Correcto, ¿Desea realizar otro registro?");
          //if (r == true) {
            this.op = 'I';
            this.esclerometro={
              pk_esclerometro:null,
              escle_provincia:null,
              escle_ciudad:null,
              escle_parroquia:null,
              escle_zona:null,
              escle_sector:null,
              escle_manzana:null,
              escle_predio:null,
              escle_prop_horizontal:null,
              escle_derech_acentamiento:null,
              escle_urb_coop_barrio:null,
              escle_calle_av:null,
              escle_fecha:null,
              escle_elemento:null,
              escle_resistencia:null,
              escle_tp_martillo:"Esclerómetro PCE-HT 225A / PCE-HT 75 ",
              escle_fech_calibr:null,
              escle_orientacion:null,
              escle_lectura_reb:{"valores": [{val:0}, {val:0}, {val:0}, {val:0},
                {val:0}, {val:0}, {val:0}, {val:0}, {val:0}, {val:0} 
                , {val:0}, {val:0}]},
              escle_promedio:null,
              escle_desviacio:null,
              escle_observacion:null,
              escle_promed_corre:null,
              escle_fc_tabla:null,
              escle_dispercion:null,
              escle_creacion:null,
              escle_modificacion:null,
              json_corregido: [{val:0}, {val:0}, {val:0}, {val:0},
                {val:0}, {val:0}, {val:0}, {val:0}, {val:0}, {val:0} 
                , {val:0}, {val:0}]
            }
          //} else {
            this._router.navigate(['/apps/esclerometro']);           
          //}
        }else{
          alert('Error inesperado, contacte administrador');
        }     
      });
    }else if(this.op == 'E'){

      this.esclerometro.pk_esclerometro = this.codigo;
      this.esclerometro.escle_modificacion = {"user": data.pk_user, "fecha": new Date()};
      
      this._esclerometroService.apiEsclerometro("U", this.esclerometro)
      .subscribe((resp:any) => {
        this.guardando = false;
        this.openDialog(resp.respuesta.data);
         this._router.navigate(['/apps/esclerometro']);
      });
    }
    
  }

  valPress(evt, tipo){
    if(evt.key >= 0 || evt.key == '.'){
      return true;
    }else{
      return false;
    }
  }

valBlur(evt){ 
    if(evt.target.value > 0){
    }else{
      evt.target.value = 0;
    }
  
}


}

export interface esclerometroModel{
  pk_esclerometro:number;
  escle_provincia:number;
  escle_ciudad:number;
  escle_parroquia:number;
  escle_zona:string;
  escle_sector:string;
  escle_manzana:string;
  escle_predio:string;
  escle_prop_horizontal:string;
  escle_derech_acentamiento:string;
  escle_urb_coop_barrio:string;
  escle_calle_av:string;
  escle_fecha:any;
  escle_elemento:number;
  escle_resistencia:number;
  escle_tp_martillo:string;
  escle_fech_calibr:any;
  escle_orientacion:number;
  escle_lectura_reb:any;
  escle_promedio:number;
  escle_desviacio:number;
  escle_observacion:string;
  escle_promed_corre:number;
  escle_fc_tabla:number;
  escle_dispercion:number;
  escle_creacion:any;
  escle_modificacion:any;
  json_corregido:any;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./tabla.scss']
})
export class DialogMedidaComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMedidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void{
      //console.log(this.data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
