import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { TokenadminService } from '../../../services/tokenadmin.service';

@Component({
    selector     : 'register-2',
    templateUrl  : './register-2.component.html',
    styleUrls    : ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy
{

    registerForm: FormGroup;

    messageError:string= '';
    divError = false;
    isLogin:boolean=false;

    registerD:RegisterModel={
        nombres:null,
        email:null,
        password:null,
    }

    // Private
    private _unsubscribeAll: Subject<any>;

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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    rstInp(){
        this.divError = false;
    }
    

    register(){
        this.isLogin = true;
        this._loginService.auth('R',this.registerD)
        .subscribe((resp:any) =>{
          var dataResp = resp.respuesta;
          var tokenU = resp.token;
          if(dataResp.status == 1){
              /*this._tokenAdminService.limpiarTokenUser();
              this._tokenAdminService.crearTokenUsuarioLocalStorage(tokenU,dataResp.data);
              this._router.navigate(['apps/dashboards/analytics']);  //redirigir a steps*/
          }else{
            this.divError = true;
            this.messageError = dataResp.messsage;
            this.isLogin = false;
          }     
          //this._router.navigate(['apps/dashboards/analytics']);
        });
      }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};

export interface RegisterModel{
    nombres:string,
    email:string,
    password:string 
};