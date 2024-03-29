import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { BlogComponent }            from './blog/blog.component';
import { TestComponent }            from './test/test.component';
import { FrontpageComponent }       from './frontpage/frontpage.component';
import { ProjectsComponent }        from './projects/projects.component';
import { CalculatorComponent }      from './calculator/calculator.component';
import { PlaygroundComponent }      from './playground/playground.component';
import { BeatMusicComponent }       from './beat-music/beat-music.component';

const routes: Routes = 
[
  { path: '',                                       component: FrontpageComponent               },
  { path: 'projects',                               component: ProjectsComponent                },
  { path: 'projects/:title',                        component: ProjectsComponent                },
  { path: 'notes',                                  component: BlogComponent                    },
  { path: 'test',                                   component: TestComponent                    },
  { path: 'play-demo',                              component: BeatMusicComponent               },
  { path: 'calc',                                   component: CalculatorComponent              },
  { path: 'notes/:title',                           component: BlogComponent                    }
  //{ path: '**',                                     component: PageNotFoundComponent,           canActivate: [NeutralGuard]   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
