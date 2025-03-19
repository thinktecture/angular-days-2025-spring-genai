import {Component, OnInit} from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-root',
    imports: [NavComponent, MatSelectionList, MatListOption, MatProgressBar, MatButton, MatIcon, MatFormField, MatInput, MatInputModule, MatFabButton],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // LAB #2

  // LAB #3

  // LAB #5

  async ngOnInit() {
    // LAB #2
  }

  async runPrompt(userPrompt: string, languageModel: string) {
    // LAB #3
  }

  async* inferWebLLM(userPrompt: string): AsyncGenerator<string> {
    // LAB #3, #7, #8
  }

  async* inferPromptApi(userPrompt: string) {
    // LAB #9
  }

  addTodo() {
    // LAB #5
  }
}
