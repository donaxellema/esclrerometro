import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImprimirPdfService {

  constructor() { }

  ningreso(){

    let table = ' <h1>Title</h1> <p>FullCalendar seamlessly integrates with the Angular 9. It provides a {{doesWhat}} that exactly matches the functionality'
                  +' of FullCalendar’s standard API. This component is built and maintained by irustm in partnership with the maintainers of FullCalendar. '
                  +' It is the official Angular connector, released under an MIT license, the same license the standard version of FullCalendar uses. Useful links:</p>'
          +'<table width="100%" style="font-size: 9pt">'
                +'   <tr>'
                +'      <th width="10%">FECHA</th>'
                +'      <th width="30%">DETALLE</th>'
                +'     <th width="15%">LOTE</th>'
                +'    <th width="20%">ENTRADAS</th>'
                +'      <th width="20%">{{doesWhat}}</th>'
                +'      <th width="15%">EXISTENCIAS</th>'
                +'    </tr>'
                +'    <tr>'
                +'      <th width="10%"></th>'
                +'      <th width="30%"></th>'
                +'      <th width="15%"></th>'

                +'      <th width="20%"> <table width="100%"><tr><td width="30%">C</td><td width="30%">VU</td><td width="30%">VT</td></tr></table> </th>'
                +'      <th width="20%"> <table width="100%"><tr><td width="30%">C</td><td width="30%">VU</td><td width="30%">VT</td></tr></table> </th>'
                +'      <th width="15%"> <table width="100%"><tr><td width="30%">C</td><td width="30%">VT</td></tr></table> </th>'
                +'     </tr>'
                +'  </table>';

      return table;
  }



  
}
