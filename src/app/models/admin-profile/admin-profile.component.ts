import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { CoachData, MOCK_TEST, TestData } from '../../../mocks/admin-profile-utils.mock';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  AssignSelector = false;

  assignedTests: TestData[] = [];

  notAssignedTests: TestData[] = [];

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TestData>(MOCK_TEST);
  }

  displayedColumns: string[] = ['ID', 'Position', 'Level', 'Date', 'Coach', 'Button'];

  displayedColumns1: string[] = ['ID', 'Position', 'Level', 'Date', 'button'];

  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource: MatTableDataSource<TestData>;

  ngOnInit(): void {
    this.sortByIsAssign(this.dataSource.data);
  }

  openDialog(positionValue: number, coachData: CoachData, Assign: boolean) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: {
        position: positionValue - 1,
        coach: coachData,
        isAssign: Assign,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.coach === undefined) return;
      const assignedTest = this.dataSource.data[result.position];
      assignedTest.coach = result.coach;
      if (!assignedTest.isAssign) {
        this.assignedTests.unshift(assignedTest);
        this.notAssignedTests.splice(this.notAssignedTests.indexOf(assignedTest), 1);
        assignedTest.isAssign = true;
        this.table.renderRows();
      }
    });
  }

  sortByIsAssign(data: TestData[]) {
    data.forEach((element) => {
      if (element.isAssign) {
        this.assignedTests.push(element);
      } else this.notAssignedTests.push(element);
    });
  }

  onTabChange(): void {
    this.AssignSelector = !this.AssignSelector;
  }
}
