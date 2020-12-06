import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/auth/login/login.module';
import { Login2Module } from 'app/main/auth/login-2/login-2.module';
import { RegisterModule } from 'app/main/auth/register/register.module';
import { Register2Module } from 'app/main/auth/register-2/register-2.module';
import { ForgotPasswordModule } from 'app/main/auth/forgot-password/forgot-password.module';
import { ForgotPassword2Module } from 'app/main/auth/forgot-password-2/forgot-password-2.module';
import { ResetPasswordModule } from 'app/main/auth/reset-password/reset-password.module';
import { ResetPassword2Module } from 'app/main/auth/reset-password-2/reset-password-2.module';
import { LockModule } from 'app/main/auth/lock/lock.module';
import { MailConfirmModule } from 'app/main/auth/mail-confirm/mail-confirm.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        Login2Module,
        RegisterModule,
        Register2Module,
        ForgotPasswordModule,
        ForgotPassword2Module,
        ResetPasswordModule,
        ResetPassword2Module,
        LockModule,
        MailConfirmModule,
        MatProgressSpinnerModule
    ],
})
export class AuthModule
{

}
