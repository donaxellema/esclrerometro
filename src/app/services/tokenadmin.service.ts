import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as jwt_decode from "jwt-decode";
import * as moment from 'moment';
import * as CryptoJS  from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenadminService {
  myToken:any;
  myUser:any;
  myRoles:any;
  logged:any=false;
  tokenTemporalSGH:any;

  constructor(@Inject(DOCUMENT) private _document, private router:Router) { 
    this.cargarValoresLocalStorage();
  }



  crearTokenUsuarioLocalStorage(token:any,user:any){
    if(!localStorage.getItem('ecomm_user')){
       localStorage.setItem('ecomm_user',token);
       localStorage.setItem('ecomm_data',this.myUser=this.encryptData(user));
    }
  }

  editDataUsuario(newData){
    localStorage.setItem('ecomm_data',this.encryptData(newData));
  }

  /*refrescarUser(user:any){
    localStorage.removeItem('sgh_user');
    this.myUser={};
    localStorage.setItem('sgh_user', this.encryptData(user));
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user/perfil']);
     }); 
  }*/

  /*refrescarRoles(roles:any){
    localStorage.removeItem('sgh_roles');
    this.myRoles={};
    localStorage.setItem('sgh_roles', this.encryptData(roles));
  }*/

  cargarValoresLocalStorage(){
    this.myToken=localStorage.getItem('ecomm_user');
    this.myUser=this.decryptData(localStorage.getItem('ecomm_data'));
    if(this.myUser != undefined){
      this.logged=true;
    }else{
      this.logged=false;
    }
  }

   //validar si token ya expiro
   validarExpiracionToken(token:any){
    if (localStorage.getItem('ecomm_user')){
    let decodedToken=this.getDecodedAccessToken(token);
    let expirationDate = decodedToken.exp; // get token expiration dateTime
    if(Number(moment().format('X')) > Number(expirationDate)){
      return false;//token expiro
    }else{
      return true;//token todavia valido
    }
  }
  else{
    return false;
  }
}

limpiarTokenUser(){
  if(localStorage.getItem('ecomm_user')){
    localStorage.removeItem('ecomm_user');
    localStorage.removeItem('ecomm_data');
    this.myToken={};
    this.myUser={};
    this.myRoles={};
  }
}

getDecodedAccessToken(token: string): any {
  try{
    return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}


encryptData(data) {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'Sgh_System2020').toString();
  } catch (e) {
    //console.log(e);
  }
}

/*encryptMd5(data){
  let hash = Md5.hashStr(data+"");
  return hash;
}*/

decryptData(data) {

  try {
    const bytes = CryptoJS.AES.decrypt(data, 'Sgh_System2020');
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    //console.log(e);
  }
}

}
