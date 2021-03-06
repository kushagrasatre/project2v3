import { Component, OnInit } from '@angular/core';
import {SearchJsonService} from "../search-json.service";
import { ExcelServicesService } from '../services/excel-services.service';
@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss']
})
export class DataSearchComponent implements OnInit {
  name = "Angular";
  activePage:number = 0;
  config: any;
  collection = { count: 60, data: [] };
  displayActivePage(activePageNumber:number){
    this.activePage = activePageNumber;
  }
searchData:any;
lead=[];
followers=[];
columnName=[];
rowData=[];
excel=[];
filteredArray=[];
defaultDisplayNumber=10;
actual_array=[];
  constructor(private excelService: ExcelServicesService, private service: SearchJsonService) {

    this.service.getJson().subscribe(
      (data)=>{
      this.searchData=data;
      console.log(this.searchData.rows.length/this.defaultDisplayNumber);
     // console.log(this.searchData);
      this.searchData.columns.forEach(element => {
        this.columnName.push(element.name);
      });
      this.searchData.rows.forEach(element => {
        this.rowData.push(element);
        this.actual_array.push(element);
        this.excel.push(element);
      });
      console.log(this.rowData);
      }
    );
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.rowData.length
    };
   }

  ngOnInit() {

    // console.log(this.searchData);
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excel, 'sample');
 }
 pageChanged(event){
  this.config.currentPage = event;
  console.log(this.config.currentPage);
}
keySearch(event){
  this.config.currentPage=1;
  if(event.target.value.length<1){
    this.searchData.rows.forEach(element => {
      this.rowData=this.actual_array;
    });
  }
   this.rowData=this.actual_array.filter((element)=>{
    if(!element.name.toLowerCase().indexOf(event.target.value)){
      return element;
    }
  });
}
}