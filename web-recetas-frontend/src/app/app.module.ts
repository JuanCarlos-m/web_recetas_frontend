import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaRecetasComponent } from './layout/home/lista_recetas/lista-recetas/lista-recetas.component';
import { RecetaComponent } from './layout/receta/receta.component';
import { NewRecipeComponent } from './layout/new_recipe/new-recipe/new-recipe.component';
import { ListaComentariosComponent } from './layout/receta/lista-comentarios/lista-comentarios.component';
import { ComentarioComponent } from './layout/receta/lista-comentarios/comentario/comentario.component';
import { NuevocomentarioComponent } from './layout/receta/lista-comentarios/nuevocomentario/nuevocomentario.component';
import { PerfilUsuarioComponent } from './layout/perfil-usuario/perfil-usuario.component';
import { RecetasUsuarioComponent } from './layout/perfil-usuario/recetas-usuario/recetas-usuario.component';
import { HeaderComponent } from './layout/header/header.component';
import { EditarRecetaComponent } from './layout/receta/editar-receta/editar-receta.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './layout/search/search.component';
import { RecetaEntryComponent } from './layout/home/lista_recetas/receta-entry/receta-entry.component';
import { RegistroComponent } from './layout/registro/registro.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ShortenedPipe } from './core/pipes/shortened/shortened.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from './core/pipes/date/date.pipe';
import { UppercasePipe } from './core/pipes/uppercase/uppercase.pipe';
import { AgePipe } from './core/pipes/age/age.pipe';
import { NoformatPipe } from './core/pipes/noformat/noformat.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListaRecetasComponent,
    RecetaComponent,
    NewRecipeComponent,
    ListaComentariosComponent,
    ComentarioComponent,
    NuevocomentarioComponent,
    PerfilUsuarioComponent,
    RecetasUsuarioComponent,
    HeaderComponent,
    EditarRecetaComponent,
    SearchComponent,
    RecetaEntryComponent,
    RegistroComponent,
    ShortenedPipe,
    DatePipe,
    UppercasePipe,
    AgePipe,
    NoformatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    EditorModule,
    FontAwesomeModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
