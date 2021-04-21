import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../models/question.interface';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  answered = new EventEmitter<boolean>();

  @Input() currentPlayerNumber = 0;
  @Input() currentQuestionNumber = 0;

  @Input() currentQuestion: Question;

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.currentQuestion = {
      text: 'Texto de pregunta',
      A: 'Primera',
      B: 'Segunda',
      C: 'Tercera',
      D: 'Cuarta',
      answer: 'A'
    }
  }

  ngOnInit(): void { }

  onAnswer(answer: string): void {
    this.activeModal.close(this.currentQuestion.answer === answer);
  }
}

