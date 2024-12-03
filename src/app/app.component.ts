import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importing RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]
})
export class AppComponent {
  title = 'GoExplore';
}
