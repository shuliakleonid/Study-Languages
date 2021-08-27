import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { languageLevel, Level, ReportStatus } from '../../../constants/data-constants';
import { CoachTopicStoreService } from '../../../services/store/coach-topic-store.service';
import { CoachTopicUpdate } from '../../../interfaces/coach-edit';
import { englishLevelNumber } from '../../../helpers/checks';
import { MistakeReport, UpdateMistakeReport } from '../../../interfaces/mistake-report';
import { MistakeReportStoreService } from '../../../services/store/mistake-report-store.service';

export interface TopicEditDialogData {
  id: string;
  level: Level;
  isEdit: true;
  topicName: string;
}

@Component({
  selector: 'app-coach-profile-editor-topic-create-dialog',
  templateUrl: './topic-adding-editing-dialog.component.html',
  styleUrls: ['./topic-adding-editing-dialog.component.scss'],
})
export class TopicAddingEditingDialogComponent implements OnInit {
  topic: TopicEditDialogData | undefined;

  languageLevel = languageLevel;

  topicName = this.data.topicName;

  englishLevel: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<TopicAddingEditingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TopicEditDialogData,
    @Inject(MAT_DIALOG_DATA) public mistakeReport: MistakeReport,
    @Inject(MAT_DIALOG_DATA) public updateReport: UpdateMistakeReport,
    private coachEditorTopic: CoachTopicStoreService,
    private reportUpdate: MistakeReportStoreService,
  ) {
    if (data.isEdit && data.topicName) {
      this.topic = { ...data };
    }
  }

  reports = {
    id: this.updateReport.id,
    reportStatus: this.updateReport.reportStatus,
  };

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      topicName: new FormControl(this.data.topicName, [Validators.required]),
    });
  }

  levelChangeHandler($event: Level): void {
    this.englishLevel = englishLevelNumber($event);
  }

  updateData(): void {
    const topic: CoachTopicUpdate = {
      id: this.data.id,
      topicName: this.form.value.topicName,
      level: this.englishLevel ?? this.data.level,
    };
    if (this.data.isEdit) {
      this.coachEditorTopic.updateTopic(topic);
    } else {
      this.coachEditorTopic.createTopic(topic);
    }
    this.dialogRef.close();
  }

  solveAndUpdate(): void {
    const topic: CoachTopicUpdate = {
      id: this.data.id,
      topicName: this.topicName,
      level: this.englishLevel ?? this.data.level,
    };
    this.reports.reportStatus = ReportStatus.solve;
    this.coachEditorTopic.updateTopic(topic);
    this.reportUpdate.updateReportMistake(this.reports);
    this.dialogRef.close();
  }

  rejectMistake(): void {
    this.reports.reportStatus = ReportStatus.reject;
    this.reportUpdate.updateReportMistake(this.reports);
    this.dialogRef.close();
  }
}
