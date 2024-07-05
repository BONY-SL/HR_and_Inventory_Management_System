import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../axios.service";
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CanvasJS} from "@canvasjs/angular-stockcharts";

@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrl: './update-position.component.css'
})
export class UpdatePositionComponent implements OnInit {

  form: FormGroup;

  years: number[] = [];

  chartOptionsAttendance: any;
  chartOptionsMedical: any;
  chartOptionsGatePass: any;
  chartOptionsLeave: any;


  constructor(private axiosService: AxiosService, private fb: FormBuilder) {

    this.form = this.fb.group({
      employee_id: [''],
      job_role: [''],
      salary_type: [''],
      employee_name: [''],
      company_status: [''],
      department: [''],
      sec_id: [''],
      gender: ['']
    });

  }

  async ngOnInit() {

    this.JobPromotionUpdate.filterPredicate = (data: UpdatePromotion, filter: string) => {
      return data.employee_id.toLowerCase().includes(filter);
    };

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      this.years.push(year);
    }

    this.chartOptionsAttendance = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Monthly Attendance"
      },
      axisY: {
        title: "Attendance Status",
        interval: 1,
        maximum: 1,
        labelFormatter: function (e: any) {
          return "";
        }
      },
      axisX: {
        interval: 1,
        intervalType: "day",
        valueFormatString: "DD MMM",
        labelFormatter: function (e: any) {
          const date = new Date(e.value);
          const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
          return date.toLocaleDateString('en-US', options);
        }
      },
      data: [{
        type: "column",
        dataPoints: [],
        markerType: "circle", // Custom marker type
        markerColor: "#000000" // Custom marker color
      }]
    };


    this.chartOptionsMedical = {
      animationEnabled: true,
      title: {
        text: "Monthly Medical Details"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 14.1, name: "Approved Medicals" },
          { y: 28.2, name: "Rejected Medicals" }
        ]
      }]
    }

    this.chartOptionsGatePass = {
      animationEnabled: true,
      title: {
        text: "Monthly GatePass Details"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 14.1, name: "Approved GatePasses" },
          { y: 28.2, name: "Rejected GatePasses" }
        ]
      }]
    }

    this.chartOptionsLeave = {
      animationEnabled: true,
      title: {
        text: "Monthly Leave Details"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 14.1, name: "Approved Leaves" },
          { y: 28.2, name: "Rejected Leaves" }
        ]
      }]
    }
    await this.getEmployeeToPromotionUpdate();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.JobPromotionUpdate.filter = filterValue.trim().toLowerCase();
  }


  displayedColumns: string[] = ['employee_id', 'job_role', 'salary_type', 'employee_name', 'company_status', 'department', 'sec_id'];
  JobPromotionUpdate = new MatTableDataSource<UpdatePromotion>([]);
  selectedRow: UpdatePromotion | null = null;

  ELEMENT_DATA: UpdatePromotion[] = [];

  selectRow(row: UpdatePromotion) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
      this.form.reset();
    } else {
      this.selectedRow = row;
      this.form.patchValue(row);
    }
  }

  //get employee details
  async getEmployeeToPromotionUpdate() {
    try {
      const response = await this.axiosService.request('GET', '/getEmployeeToPromotionUpdate', {}, {});
      this.JobPromotionUpdate.data = response.data;
      this.ELEMENT_DATA = this.JobPromotionUpdate.data;
      console.log('employee details fetched successfully.....', response.data);
    } catch (error) {
      console.error('Error fetching employee details details...', error);
    }
  }

  isvisibleAction: boolean = false;


  gotoView() {

    if (!this.selectedRow) {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.isvisibleAction = !this.isvisibleAction;

    if (!this.isvisibleAction) {
      this.selectedRow = null;
      this.form.reset();
    }

    this.Leaves = false;
    this.Medicals = false;
    this.Gate = false;
    this.Attendance = false;

  }

  getEmployeeImage(gender: string): string {
    return gender === 'male' ? '/assets/images/male.png' : '/assets/images/female.png';
  }

  Leaves: boolean = false;
  Medicals: boolean = false;
  Gate: boolean = false;
  Attendance: boolean = false;

  showDivLeaves() {

    this.Leaves = true;
    this.Medicals = false;
    this.Gate = false;
    this.Attendance = false;

  }

  showDivMedicals() {
    this.Leaves = false;
    this.Medicals = true;
    this.Gate = false;
    this.Attendance = false;
  }

  showDivGate() {
    this.Leaves = false;
    this.Medicals = false;
    this.Gate = true;
    this.Attendance = false;
  }

  showDivAttendance() {
    this.Leaves = false;
    this.Medicals = false;
    this.Gate = false;
    this.Attendance = true;
  }

  async getEmployeeCVbyID() {

    if (!this.selectedRow) {

      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });
      return;
    }
    const empid = this.selectedRow?.employee_id;

    try {
      const response = await this.axiosService.request2('GET', `/downloadCvReport/${empid}`, {}, {responseType: 'blob'});

      const contentType = response.headers['content-type'];
      let fileExtension = 'pdf';


      const url = window.URL.createObjectURL(new Blob([response.data], {type: contentType}));
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv_${empid}.${fileExtension}`;
      a.click();

    } catch (error) {
      console.error('Error downloading CV Report:', error);
    }

  }

  months = [
    {value: 1, name: 'January'},
    {value: 2, name: 'February'},
    {value: 3, name: 'March'},
    {value: 4, name: 'April'},
    {value: 5, name: 'May'},
    {value: 6, name: 'June'},
    {value: 7, name: 'July'},
    {value: 8, name: 'August'},
    {value: 9, name: 'September'},
    {value: 10, name: 'October'},
    {value: 11, name: 'November'},
    {value: 12, name: 'December'}
  ];

  async searchDetails() {

    const selectedMonthElement = document.getElementById('selectedMonth') as HTMLSelectElement;
    const selectedYearElement = document.getElementById('selectedYear') as HTMLSelectElement;

    const selectedMonth = selectedMonthElement.value;
    const selectedYear = selectedYearElement.value;

    if (!this.Leaves && !this.Attendance && !this.Gate && !this.Medicals) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Any Button',
        text: "Please select an View details button.",
        confirmButtonText: 'Ok'
      });
      return;
    }
    if (selectedMonth==="Month" || selectedYear==="Year") {
      Swal.fire({
        icon: 'warning',
        title: 'Select Month And Year',
        text: "Please select Month and Year to get employee details.",
        confirmButtonText: 'Ok'
      });
    }else {

      const employeeId = document.getElementById('employee_id') as HTMLSelectElement;
      const empId = employeeId.value;

      if(this.Attendance){

        const url = `/getAttendanceByMonthAndYear/${empId}/${selectedMonth}/${selectedYear}`;

        try {

          const response = await this.axiosService.request('GET', url, {}, {});
          console.log('Response data:', response);
          const data = response.data;
          this.updateChart(data);
          this.renderChart();

        } catch (error) {
          console.error('Error fetching purchase details:', error);
          alert('Failed to fetch purchase details');
        }

      }else if(this.Leaves){

        this.renderChart4();

      }else if(this.Gate){

        this.renderChart3();

      }else if(this.Medicals){

        this.renderChart2();

      }

    }
  }

  totalPresents = 0;
  totalAbsents = 0;
  totalLates = 0;


  //update Attendance chart
  updateChart(data: any) {

    this.totalPresents = data.filter((d: any) => d.status === 'present').length;
    this.totalAbsents = data.filter((d: any) => d.status === 'absent').length;
    this.totalLates = data.filter((d: any) => d.status === 'late').length;

    const dataPoints = data.map((d: any) => {
      return {
        x: new Date(d.date),
        y: 1,
        color: d.status === 'late' ? '#f1903f' : d.status === 'absent' ? '#fa5959' : '#399339',
        toolTipContent: `{x}: ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}`, // Tooltip content
        markerType: "triangle",
        markerColor: d.status === 'late' ? '#f1903f' : d.status === 'absent' ? '#fa5959' : '#399339'
      };
    });

    this.chartOptionsAttendance.data[0].dataPoints = dataPoints;

  }

  renderChart() {
    const chart = new CanvasJS.Chart("chartContainerAttendance", this.chartOptionsAttendance);
    chart.render();
  }

  renderChart2() {
    const chart = new CanvasJS.Chart("chartContainerMedical", this.chartOptionsMedical);
    chart.render();
  }

  renderChart3() {
    const chart = new CanvasJS.Chart("chartContainerGatePass", this.chartOptionsGatePass);
    chart.render();
  }

  renderChart4() {
    const chart = new CanvasJS.Chart("chartContainerLeave", this.chartOptionsLeave);
    chart.render();
  }


}
export interface UpdatePromotion {

  employee_id:string;
  job_role:string;
  salary_type:string;
  employee_name:string;
  company_status:string;
  department:string;
  sec_id:string;
  gender:string;

}
