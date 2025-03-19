import {Component, OnInit, signal} from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {ChatCompletionMessageParam, CreateMLCEngine, MLCEngine} from '@mlc-ai/web-llm';
import {Todo} from './todo';

@Component({
    selector: 'app-root',
    imports: [NavComponent, MatSelectionList, MatListOption, MatProgressBar, MatButton, MatIcon, MatFormField, MatInput, MatInputModule, MatFabButton],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // LAB #2
  protected readonly progress = signal(0);
  protected readonly ready = signal(false);
  protected engine?: MLCEngine;

  // LAB #3
  protected readonly reply = signal('');

  // LAB #5
  protected readonly todos = signal<Todo[]>([]);

  async ngOnInit() {
    // LAB #2
    const model = 'Llama-3.2-3B-Instruct-q4f32_1-MLC';
    this.engine = await CreateMLCEngine(model, {
      initProgressCallback: ({ progress }) =>
        this.progress.set(progress)
    });
    this.ready.set(true);
  }

  async runPrompt(userPrompt: string, languageModel: string) {
    // LAB #3
    this.reply.set('…');

    const chunks = languageModel === 'webllm'
      ? await this.inferWebLLM(userPrompt)
      : await this.inferPromptApi(userPrompt);
    for await (const chunk of chunks) {
      this.reply.set(chunk);
    }
  }

  async* inferWebLLM(userPrompt: string): AsyncGenerator<string> {
    // LAB #3, #7, #8
    await this.engine!.resetChat();
    const systemPrompt = `Here's the user's todo list:
      ${this.todos().map(todo => `* ${todo.text} (${todo.done ? 'done' : 'not done'})`).join('\n')}`;
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];
    const chunks = await this.engine!.chat.completions.create({messages, stream: true});
    let reply = '';
    for await (const chunk of chunks) {
      reply += chunk.choices[0]?.delta.content ?? '';
      yield reply;
    }
  }

  async* inferPromptApi(userPrompt: string) {
    // LAB #9
  }

  addTodo() {
    // LAB #5
    const text = prompt() ?? '';
    this.todos.update(todos => [...todos,  { done: false, text }]);
  }
}
