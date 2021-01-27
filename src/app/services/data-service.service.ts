import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

  constructor(private http: HttpClient) { }


  getGlobalData() {

    return this.http.get(this.globalDataUrl, { responseType: 'text'}).pipe(map(result => {
      
      let data: GlobalDataSummary[] = []
      let raw : {[key: string] : any} = {}
      let rows = result.split('\n');
      rows.splice(0, 1);
      rows.forEach(row=>{
        let cols = row.split(',');
       
        let cs = {
          country: cols[1],
          confirmed: +cols[3],
          deaths: +cols[259],
          recovered: +cols[3],
          active: +cols[6]
        };
        let temp : GlobalDataSummary = raw[cs.country];
        if(temp){
          raw[cs.country] = temp;
        }else{
          raw[cs.country] = cs;
        }
        

      })
      console.log(raw)
      return <GlobalDataSummary[]>Object.values(raw);
    })
      
    )

  }
}
