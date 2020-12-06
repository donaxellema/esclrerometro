import { Component, OnInit } from '@angular/core';
import { LotesService } from '../../../../services/cruds/lotes.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.scss']
})
export class LotesComponent implements OnInit {
  lista:any[]=[];

  constructor(
    private _loteService:LotesService,
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.lista = this._loteService.getLotes();
    /*this._proveedorService.getProveedores()
    .subscribe((resp:any) => {

    });*/
    
  }

}
