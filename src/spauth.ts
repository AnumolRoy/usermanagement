import { ISPFXContext } from "@pnp/sp";

import "@pnp/sp/presets/all";
import {  SPFI } from "@pnp/sp";
import {  spfi} from "@pnp/sp";
import {  SPFx } from "@pnp/sp";



let sp: SPFI = spfi();


class SPService {

private _sp: SPFI = spfi();


get sp(): SPFI {

 if(!this._sp) {

throw new Error("SP is not initialized");

}

 return this._sp;
 }


public setup = (context: ISPFXContext): void => {

 this._sp = this._sp.using(SPFx(context));


sp = this._sp;

 }

}



const spService = new SPService();



export {sp, spService}