import { Component } from '@angular/core';
import {AxiosService} from "../../../../axios.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-monthly-production-report',
  templateUrl: './monthly-production-report.component.html',
  styleUrl: './monthly-production-report.component.css'
})
export class MonthlyProductionReportComponent {

  fromMonth: string = '';
  monthlymilkProductions: any[] = [];
  monthlymilkIssues: any[] = [];
  totalGoodMilkProductions: number = 0;
  totalBadMilkProductions: number = 0;
  totalIssues: number = 0;

  constructor(private ax: AxiosService) { }

  async search() {
    if (!this.fromMonth) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Date',
        text: 'Please select a Month',
      });
      return;
    }

    const [year, month] = this.fromMonth.split('-').map(Number);
    console.log('Searching for:', month, year);

    await this.fetchMilkProductions(month, year);
    await this.fetchMilkIssues(month, year);
  }

  async fetchMilkProductions(month: number, year: number) {
    try {
      const response = await this.ax.request('GET', `/getProductionsByMonth?month=${month}&year=${year}`, {}, {});
      this.monthlymilkProductions = response.data;
      console.log(this.monthlymilkProductions);

      this.totalGoodMilkProductions = this.monthlymilkProductions
        .filter(p => p.finishedState === 'Good')
        .reduce((total, p) => total + p.amount, 0);

      this.totalBadMilkProductions = this.monthlymilkProductions
        .filter(p => p.finishedState === 'Bad')
        .reduce((total, p) => total + p.amount, 0);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching monthly productions',
      });
    }
  }

  async fetchMilkIssues(month: number, year: number) {
    try {
      const response = await this.ax.request('GET', `/getIssuesByMonth?month=${month}&year=${year}`, {}, {});
      this.monthlymilkIssues = response.data;
      console.log(this.monthlymilkIssues);

      this.totalIssues = this.monthlymilkIssues.reduce((total, issue) => total + issue.numberOfBottles, 0);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching monthly issues',
      });
    }
  }
}
