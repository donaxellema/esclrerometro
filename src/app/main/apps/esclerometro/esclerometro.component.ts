import { Component, OnInit, ViewChild} from '@angular/core';
import { EsclerometroService } from '../../../services/esclerometro.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-esclerometro',
  templateUrl: './esclerometro.component.html',
  styleUrls: ['./esclerometro.component.scss']
})
export class EsclerometroComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;




  lista:any[]=[];
  conteo:number;
  busqueda:string="";

  op:string;
  data:dataModel={
    limit:10,
    offset:0,
    concepto:"",
  }

  loaded:any=false;

  constructor(
    private _esclerometroService:EsclerometroService
  ) {
          // Create 100 users
          const users: UserData[] = [];
          var users1=[];
          for (let i = 1; i <= 100; i++) { /*users.push(createNewUser(i));*/
          
            users1.push({"cnt" : i,"name":"batr"+i});
            
           }
      
          // Assign the data to the data source for the table to render
          //this.dataSource = new MatTableDataSource(users1);
   }

  //new
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'name', 'progress', 'color', 'obser', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<UserData>;

  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  ngOnInit(): void {
    this.op= "C";
    this.loaded = true;
    this.getLista();
  }

  getLista(){
    this._esclerometroService.apiEsclerometro(this.op, this.data)
    .subscribe((resp:any) => {
      this.lista = resp.respuesta.data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.conteo = resp.respuesta.conteo;
      this.loaded = true;


      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }

  onPaginateChange(e){
    this.data.offset = e.pageIndex * this.data.limit;
    this.getLista();
  }

  getBusqueda(e){
    if(this.busqueda.length > 2){
      this.op = "B";
      this.data.offset = 0;
      this.data.concepto = this.busqueda;
      this.paginator.pageIndex = 0;
      this.getLista();
    }else{
      this.op = "C";
      this.data.offset = 0;
      this.paginator.pageIndex = 0;
      this.getLista();
    }
  }

  eliminar(id){
    var person = prompt("Por favor, ingresa la contraseña:", "");
    if (person == null || person == "") {
    } else {
      if(person == "esclerometro2020//"){
        this._esclerometroService.apiEsclerometro('D', {pk_esclerometro:id})
        .subscribe((resp:any) => {
          this.getLista();
        });
      }else{
        alert('Contraseña Incorrecta');
      }
    }
  }



  //new
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  addbut(){
    window.alert("addbutton");
  }
  editbut(){
    window.alert("editbutton");
  }



}

export interface dataModel{
  limit:number,
  offset:number,
  concepto:string
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  obser:string;
  editar:any;
  eliminar:any;
}