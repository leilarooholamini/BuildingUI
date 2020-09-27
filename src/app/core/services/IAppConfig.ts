import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<string>("app.config");

export interface IAppConfig {
   apiEndpoint: string;
  apiSettingsPath: string;
  imageSrc:string;
  //fakeapiEndpoint:string;
}
//PassAbbasAbadi2019
export const AppConfig: IAppConfig = {

  apiEndpoint: "http://localhost:2517",
   apiSettingsPath: "/api/",
   imageSrc: "http://localhost:2517/ImageUpload/",
 
 
//   apiEndpoint: "http://178.22.123.214/service",
//   apiSettingsPath: "/api/",
  // imageSrc: "http://178.22.123.214/service/ImageUpload/",
};
