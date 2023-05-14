// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as dayjs from "dayjs";

export interface IEnviroment {
   production: boolean;
   host: string;
   cacheExpation: {
       value: number,
       type: dayjs.ManipulateType
   }
}


export const environment : IEnviroment = {
  production: false,
  host: "http://localhost:9001/api/",
  cacheExpation: {
    value: 1,   // number
    type: "day" 
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
