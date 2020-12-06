import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { CrudIndustriaService } from '../../../../services/cruds/crud-cateindustria.service';
import { ParametrosService } from '../../../../services/cruds/parametros.service';
import { CrudGeografiaService } from '../../../../services/cruds/crud-geografia.service';

import { TokenadminService } from '../../../../services/tokenadmin.service';
import { FinalizarSetupService } from '../../../../services/setup/finalizar-setup.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  configure:configureModel={
    empresa_nombre:null,
    empresa_cuenegoc:null,
    fk_cate_industria:null,
    empresa_numempl:null,
    empresa_razon:null,
    empresa_postal:null,
    pais:0,
    provincia:0,
    fk_geografia:0,
    empresa_direccion:null,
    user_celular:null,
    user_nombres:null,
    user_sexo:null
  }

  tiendaForm: FormGroup;

  controlPaises = new FormControl();  
  listaPaises:any[]=[];
  filteredPais: Observable<string[]>;

  controlProvincias = new FormControl();  
  listaProvincias:any[]=[];
  filteredProvincia: Observable<string[]>;

  controlCiudades = new FormControl();  
  listaCiudades:any[]=[];
  filteredCiudad: Observable<string[]>;

  loading:any=false;


  constructor(
    public router: Router,
    private _crudIndustriaService:CrudIndustriaService,
    private _parametrosService:ParametrosService,
    private _crudGeografiaService:CrudGeografiaService,
    private _tokenAdminService:TokenadminService,
    private _finalizarSetupService:FinalizarSetupService
  ) { }

  listaCategoriaIndustria:any[]=[];
  listaNumEmpleados:any[]=[];
  listaRazones:any[]=[];


  ngOnInit(): void {
    this.getCategoriasIndustria();
    this.getGeografia('C', 'p', 0);
  }

  private _filterPaises(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.listaPaises.filter(option => option.geografia_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  displayPais(value?: number) {
    return value ? this.listaPaises.find(_ => _.pk_geografia === value).geografia_descri : undefined;
  }

  private _filterProvincia(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.listaProvincias.filter(option => option.geografia_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  displayProvincia(value?: number) {
    return value ? this.listaProvincias.find(_ => _.pk_geografia === value).geografia_descri : undefined;
  }

  private _filterCiudad(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.listaCiudades.filter(option => option.geografia_descri.toLowerCase().indexOf(filterValue) === 0);
  }

  displayCiudad(value?: number) {
    return value ? this.listaCiudades.find(_ => _.pk_geografia === value).geografia_descri : undefined;
  }


  getCategoriasIndustria(){
    this._crudIndustriaService.consultaCategoriasIndustria()
    .subscribe((resp:any) =>{
      this.listaCategoriaIndustria = resp.respuesta.data;
      this.getNumEmpleados();
    });
  }

  getNumEmpleados(){
    this._parametrosService.consultaParametrosxTipo('numemple')
    .subscribe((resp:any) =>{
      this.listaNumEmpleados = resp.respuesta.data;
      this.getRazones();
    });
  }

  getRazones(){
    this._parametrosService.consultaParametrosxTipo('razon')
    .subscribe((resp:any) =>{
      this.listaRazones = resp.respuesta.data;
    })
    }

    getGeografia(opcion, tipo, padre){
      this._crudGeografiaService.consultaParametrosxTipo(opcion, tipo, padre)
      .subscribe((resp:any) =>{
        switch(tipo){
          case 'p':
            this.listaPaises = resp.respuesta.data;
            this.filteredPais = this.controlPaises.valueChanges.pipe(
              startWith(''),
              map(value => this._filterPaises(value))
            );
          break;
          case 'pr':
            this.listaProvincias = resp.respuesta.data;
            this.filteredProvincia = this.controlProvincias.valueChanges.pipe(
              startWith(''),
              map(value => this._filterProvincia(value))
            );
          break;
          case 'c':
            this.listaCiudades = resp.respuesta.data;
            this.filteredCiudad = this.controlCiudades.valueChanges.pipe(
              startWith(''),
              map(value => this._filterCiudad(value))
            );
          break;
        }

      });
    }

    
  changeGeografia(tipo,value){
    switch(tipo){
      case 'p':
        console.log(value);
        //this.ubicacion.provincia = 0;
      //cotinuar con esta validacion para los select
      break;
      case 'pr':

      break;
    }
    if(value != undefined){
      this.getGeografia('C', tipo, value);
    }
  }


  finalizarSetup(){
    this.loading = true;
    this._tokenAdminService.cargarValoresLocalStorage();
    if(this._tokenAdminService.logged){
        let user = this._tokenAdminService.decryptData(this._tokenAdminService.myUser);
        let pk_user = user.pk_user;
        let user_login = user.user_login;
        this._finalizarSetupService.finalizarSetup(pk_user,this.configure)
        .subscribe((resp:any) =>{
          let empresa = resp.respuesta.data.pk_empresa;
          let newuser = {
            pk_user: user.pk_user,
            user_email: user.user_email,
            user_icon: user.user_icon,
            user_login: user.user_login,
            user_nombres: this.configure.user_nombres,
            user_ultimaemp: empresa
          }
          this._tokenAdminService.editDataUsuario(newuser);
          //this.router.navigate(['apps/'+user_login+'/'+empresa+'/dashboards']);
          window.location.href = 'http://localhost:4200/apps/'+user_login+'/'+empresa+'/dashboards';
        });
    }else{
      this.router.navigate(['auth/login']);
    }
  }

}


export interface configureModel{
  empresa_nombre:string;
  empresa_cuenegoc:number;
  fk_cate_industria:number;
  empresa_numempl:number;
  empresa_razon:string;

  empresa_postal:string;
  pais:number;
  provincia:number;
  fk_geografia:number;
  empresa_direccion:string;
  user_celular:number;
  
  user_nombres:string;
  user_sexo:number
}