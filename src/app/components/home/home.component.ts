import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[] = []
  

  constructor(private dataService: DataServiceService) { 

  
    
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) =>{
        
        this.globalData = result;

        result.forEach(cs=>{
          if(cs.confirmed && cs.deaths && cs.recovered){
          
            this.totalConfirmed = cs.confirmed;
            this.totalRecovered = cs.recovered;
            this.totalDeaths = cs.deaths;

          }
        })

      }
    })
  }

}
