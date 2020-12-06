import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { TokenadminService } from '../../../services/tokenadmin.service';


@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;

    messageError:string= '';
    divError = false;
    isLogin:boolean=false;

    loginD:loginModel={
        email:null,
        password:null,
    }

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router:Router,
        private _loginService:LoginService,
        private _tokenAdminService:TokenadminService,

    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    rstInp(){
        this.divError = false;
    }
    


    login(){
      this.isLogin = true;
      this._loginService.auth('L',this.loginD)
      .subscribe((resp:any) =>{
        var dataResp = resp.respuesta;
        var tokenU = resp.token;
        if(dataResp.status == 1){
            /*this._tokenAdminService.limpiarTokenUser();
            this._tokenAdminService.crearTokenUsuarioLocalStorage(tokenU,dataResp.data);
            this._router.navigate(['apps/dashboards/analytics']);*/
        }else{
            this.divError = true;
            this.messageError = dataResp.messsage;
            this.isLogin = false;
        }     
        //this._router.navigate(['apps/dashboards/analytics']);
      });
    }
}

export interface loginModel{
    email:string,
    password:string 
  };