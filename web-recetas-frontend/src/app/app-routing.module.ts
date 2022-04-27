import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { RecetaComponent } from './layout/receta/receta.component';
import { NewRecipeComponent } from './layout/new_recipe/new-recipe/new-recipe.component';
import { PerfilUsuarioComponent } from './layout/perfil-usuario/perfil-usuario.component';
import { EditarRecetaComponent } from './layout/receta/editar-receta/editar-receta.component';
import { SearchComponent } from './layout/search/search.component';
import { RegistroComponent } from './layout/registro/registro.component';




const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'receta/:id', component: RecetaComponent},
  {path: 'new_recipe', component: NewRecipeComponent},
  {path:'user/:username', component: PerfilUsuarioComponent},
  {path:'receta/:id/edit', component:EditarRecetaComponent},
  {path:'search/:search', component:SearchComponent},
  {path: 'signin', component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
