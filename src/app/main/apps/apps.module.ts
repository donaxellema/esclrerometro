import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FuseSharedModule } from '@fuse/shared.module';

import { NingresoComponent } from './bodega/ningreso/ningreso.component';
import { DialogDataExampleDialog } from './bodega/ningreso/ningreso.component';
import { NegresoComponent } from './bodega/negreso/negreso.component';
import { DialogDataNegreso } from './bodega/negreso/negreso.component';
import { SolicitarComponent } from './bodega/solicitar/solicitar.component';
import { DialogDataSolicitar } from './bodega/solicitar/solicitar.component';
import { NingresofComponent } from './farmacia/ningresof/ningresof.component';
import { DialogDataNingresoF } from './farmacia/ningresof/ningresof.component';
import { NegresofComponent } from './farmacia/negresof/negresof.component';
import { DialogDataNegresoF } from './farmacia/negresof/negresof.component';
import { RecetaFormComponent } from './farmacia/recetas/receta-form/receta-form.component';
import { DialogDataReceta } from './farmacia/recetas/receta-form/receta-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BorradoresComponent } from './bodega/borradores/borradores.component';
import { IngresosComponent } from './bodega/ingresos/ingresos.component';
import { ProveedoresComponent } from './bodega/proveedores/proveedores.component';
import { ProveedoresFormComponent } from './bodega/proveedores/proveedores-form/proveedores-form.component';
import { EgresosComponent } from './bodega/egresos/egresos.component';
import { InventarioComponent } from './bodega/inventario/inventario.component';
import { LotesComponent } from './bodega/lotes/lotes.component';
import { ProductosComponent } from './bodega/productos/productos.component';
import { ReportesComponent } from './bodega/reportes/reportes.component';
import { MarcasComponent } from './bodega/marcas/marcas.component';
import { TiposingresoComponent } from './bodega/tiposingreso/tiposingreso.component';
import { TiposegresoComponent } from './bodega/tiposegreso/tiposegreso.component';
import { PresentacionComponent } from './bodega/presentacion/presentacion.component';
import { LotesFormComponent } from './bodega/lotes/lotes-form/lotes-form.component';
import { ProductosFormComponent } from './bodega/productos/productos-form/productos-form.component';
import { MarcasFormComponent } from './bodega/marcas/marcas-form/marcas-form.component';
import { TiposingresoFormComponent } from './bodega/tiposingreso/tiposingreso-form/tiposingreso-form.component';
import { TiposegresoFormComponent } from './bodega/tiposegreso/tiposegreso-form/tiposegreso-form.component';
import { PresentacionFormComponent } from './bodega/presentacion/presentacion-form/presentacion-form.component';
import { DespachoComponent } from './farmacia/despacho/despacho.component';
import { DevolucionesComponent } from './farmacia/devoluciones/devoluciones.component';
import { RecetasComponent } from './farmacia/recetas/recetas.component';
import { IngresosfComponent } from './farmacia/ingresosf/ingresosf.component';
import { InventariofComponent } from './farmacia/inventariof/inventariof.component';
import { BorradoresfComponent } from './farmacia/borradoresf/borradoresf.component';
import { EgresosfComponent } from './farmacia/egresosf/egresosf.component';
import { MisrecetasComponent } from './farmacia/misrecetas/misrecetas.component';
import { Step1Component } from './configure/step1/step1.component';
import { DashboardComponent } from './bodega/dashboard/dashboard.component';
import { EsclerometroComponent } from './esclerometro/esclerometro.component';
import { EsclerometroFormComponent } from './esclerometro-form/esclerometro-form.component';
import { FrameComponent } from './frame/frame.component';
import { FrameDosComponent } from './frame-dos/frame-dos.component';
import { FrameTresComponent } from './frame-tres/frame-tres.component';

import{DialogMedidaComponent} from './esclerometro-form/esclerometro-form.component';

//import { DialogComponent } from './esclerometro-form/dialog.component';


const routes = [

    //esclorometro
    {
        path        : 'esclerometro',
        component:  EsclerometroComponent
    },
    {
        path        : 'esclerometro/:id',
        component:  EsclerometroFormComponent
    },
    {
        path        : 'frame',
        component:  FrameComponent
    },
        {
        path        : 'frame2',
        component:  FrameDosComponent
    },
    {
        path        : 'frame3',
        component:  FrameTresComponent
    },

    //nuevas rutas
    {
        path        : 'dashboards/configure',
        component:  Step1Component
    },
    {
        path        : ':usuario/:empresa/dashboards',
        component:  DashboardComponent
    },
    {
        path        : ':usuario/:empresa/ningreso/:tipo',
        component: NingresoComponent,
    },
    {
        path        : ':usuario/:empresa/ingresos',
        component: IngresosComponent,
    },
    {
        path        : ':usuario/:empresa/negreso/:tipo',
        component: NegresoComponent,
    },
    {
        path        : ':usuario/:empresa/egresos',
        component: EgresosComponent,
    },
    {
        path        : ':usuario/:empresa/inventario',
        component: InventarioComponent,
    },
    {
        path        : ':usuario/:empresa/lotes',
        component: LotesComponent,
    },
    {
        path        : ':usuario/:empresa/lote/:id',
        component: LotesFormComponent,
    },
    {
        path        : ':usuario/:empresa/productos',
        component: ProductosComponent,
    },
    {
        path        : ':usuario/:empresa/producto/:id',
        component: ProductosFormComponent,
    },
    {
        path        : ':usuario/:empresa/categorias',
        component: MarcasComponent,
    },
    {
        path        : ':usuario/:empresa/categoria/:id',
        component: MarcasFormComponent,
    },
    {
        path        : ':usuario/:empresa/bodegas',
        component: MarcasComponent,
    },
    {
        path        : ':usuario/:empresa/bodega/:id',
        component: MarcasFormComponent,
    },
    {
        path        : ':usuario/:empresa/colecciones',
        component: MarcasComponent,
    },
    {
        path        : ':usuario/:empresa/coleccion/:id',
        component: MarcasFormComponent,
    },
    {
        path        : ':usuario/:empresa/parametros',
        component: MarcasComponent,
    },
    {
        path        : ':usuario/:empresa/parametro/:id',
        component: MarcasFormComponent,
    },
    {
        path        : ':usuario/:empresa/marcas',
        component: MarcasComponent,
    },
    {
        path        : ':usuario/:empresa/marca/:id',
        component: MarcasFormComponent,
    },
    {
        path        : ':usuario/:empresa/temas',
        component: MarcasComponent,
    },
    {
        path        : ':usuario/:empresa/personalizar',
        component: MarcasComponent,
    },
    //fin nuevas rutas
   {
        path        : 'borradores',
        component: BorradoresComponent,
    },

    {
        path        : 'proveedores',
        component: ProveedoresComponent,
    },
    {
        path        : 'proveedor/:id',
        component: ProveedoresFormComponent,
    },
    {
        path        : 'reportes',
        component: ReportesComponent,
    },
    {
        path        : 'tiposingreso',
        component: TiposingresoComponent,
    },
    {
        path        : 'tipoingreso/:id',
        component: TiposingresoFormComponent,
    },
    {
        path        : 'tiposegreso',
        component: TiposegresoComponent,
    },
    {
        path        : 'tipoegreso/:id',
        component: TiposegresoFormComponent,
    },
    {
        path        : 'presentaciones',
        component: PresentacionComponent,
    },
    {
        path        : 'presentacion/:id',
        component: PresentacionFormComponent,
    },
    {
    path        : 'solicitar/:tipo',
        component: SolicitarComponent,
    },
    {
        path    : 'receta/:id', 
        component : DespachoComponent,
    },
    {
        path    : 'devolucionesr', 
        component : DevolucionesComponent,
    },
    {
        path    : 'ingresosf', 
        component : IngresosfComponent,
    },
    {
        path    : 'egresosf', 
        component : EgresosfComponent,
    },
    {
        path : 'recetas',
        component : RecetasComponent
    },
    {
        path        : 'ningresof/:tipo',
        component: NingresofComponent,
    },
    {
        path        : 'negresof/:tipo',
        component: NegresofComponent,
    },
    {
        path        : 'inventariof',
        component: InventariofComponent,
    },
    {
        path        : 'borradoresingf',
        component: BorradoresfComponent,
    },
    {
        path        : 'recetaf/:tipo',
        component: RecetaFormComponent,
    },
    {
        path        : 'misrecetas',
        component: MisrecetasComponent,
    }, 
   { 
        path        : 'dashboards/analytics',
        loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path        : 'dashboards/project',
        loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
    },
    {
        path        : 'mail',
        loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    },
    {
        path        : 'mail-ngrx',
        loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    },
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path        : 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
        path        : 'e-commerce',
        loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
    },
    {
        path        : 'academy',
        loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
    },
    {
        path        : 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
    },
    {
        path        : 'file-manager',
        loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
    },
    {
        path        : 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
    },
    {
        path        : 'scrumboard',
        loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
    }
];

@NgModule({
    declarations: [
        NingresoComponent,
        DialogDataExampleDialog,
        NegresoComponent,
        DialogDataNegreso,
        BorradoresComponent,
        IngresosComponent,
        ProveedoresComponent,
        ProveedoresFormComponent,
        EgresosComponent,
        InventarioComponent,
        LotesComponent,
        ProductosComponent,
        ReportesComponent,
        MarcasComponent,
        TiposingresoComponent,
        TiposegresoComponent,
        PresentacionComponent,
        LotesFormComponent,
        ProductosFormComponent,
        MarcasFormComponent,
        TiposingresoFormComponent,
        TiposegresoFormComponent,
        PresentacionFormComponent,
        SolicitarComponent,
        DialogDataSolicitar,
        DespachoComponent,
        DevolucionesComponent,
        RecetasComponent,
        NingresofComponent,
        IngresosfComponent,
        DialogDataNingresoF,
        InventariofComponent,
        BorradoresfComponent,
        EgresosfComponent,
        NegresofComponent,
        DialogDataNegresoF,
        RecetaFormComponent,
        DialogDataReceta,
        MisrecetasComponent,
        Step1Component,
        EsclerometroComponent,
        EsclerometroFormComponent,
        FrameComponent,
        FrameDosComponent,
        FrameTresComponent,
        DialogMedidaComponent,
        //DialogComponent
        
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppsModule
{
}
