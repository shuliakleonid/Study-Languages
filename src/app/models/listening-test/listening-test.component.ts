import { Component, OnInit } from '@angular/core';
import { MOCK_QUESTION_LIST_AUDITION, Question } from '../../../constants/mock-grammar-test';

@Component({
  selector: 'app-listening',
  templateUrl: './listening-test.component.html',
  styleUrls: ['./listening-test.component.scss'],
})
export class ListeningTestComponent implements OnInit {
  questions: Question[] = [];

  ngOnInit(): void {
    this.questions = [...MOCK_QUESTION_LIST_AUDITION];
  }
}
