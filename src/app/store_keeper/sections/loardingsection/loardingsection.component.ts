import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-loardingsection',
  templateUrl: './loardingsection.component.html',
  styleUrl: './loardingsection.component.css'
})
export class LoardingsectionComponent implements OnInit{

  displayedColumns: string[] = ['loading_id', 'bottle_amount','batch_code', 'submit_date', 'submit_time','agent_id',];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: Element | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [

    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },
    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },
    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },
    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },
    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },
    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },
    { loading_id: 1, bottle_amount: 10,batch_code: "000B1",submit_date: new Date(), submit_time: new Date(),agent_id:"EPF00001" },


    // ... more data
  ];


  displayedColumns2: string[] = ['agent_id', 'agent_Address','agency_name', 'agent_name', 'agent_contact','agent_mail',];
  dataSource2 = new MatTableDataSource<TableElement3>([]);
  selectedRow2: Element | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA2: TableElement3[] = [

    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" },
    { agent_id: 1, agent_Address: "kaluthara wadduwa",agency_name: "Thilakasiri PVT LTD",agent_name: "Kamal", agent_contact: "0771981995",agent_mail:"danidutharuka12345@gmail.com" }

    // ... more data
  ];

  ngOnInit() {
    this.dataSource.data = this.ELEMENT_DATA;
    this.dataSource2.data = this.ELEMENT_DATA2;
  }

  selectRow(row: Element): void {
    this.selectedRow = row;
  }

  selectRow2(row2: Element): void {
    this.selectedRow2 = row2;
  }



  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view

  //the method use for visible to the add details form
  toggleAddDetails(): void {
    this.isAddDetailsVisible = !this.isAddDetailsVisible;
    // Ensure update div is closed when opening add details
    if (this.isAddDetailsVisible) {
      this.isUpdateVisible = false;
    }
  }

  toggleUpdate(): void {
    this.isUpdateVisible = !this.isUpdateVisible;
    // Ensure add details div is closed when opening update
    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
    }
  }

  showAgentDetailsFlag: boolean = false;

  closeAgent(){

    this.showAgentDetailsFlag=false;
  }
  showAgentDetails() {
    // Set flag to true to show agent details div
    this.showAgentDetailsFlag = true;
  }
}

export interface TableElement {
  loading_id: number;
  bottle_amount: number;
  batch_code: String;
  submit_date: Date;
  submit_time: Date;
  agent_id:String;

}

export interface TableElement3 {
  agent_id: number;
  agent_Address: String;
  agency_name: String;
  agent_name: String;
  agent_contact: String;
  agent_mail:String;

}

