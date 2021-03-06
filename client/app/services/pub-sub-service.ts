import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {GotoTabEventEmitter} from './event-emitter';
import {ChangeCategoryEventEmitter} from './event-emitter';
import {ShoppingcartChangeEventEmitter} from './event-emitter';

@Injectable()
export class PubSubService{
   static instance: PubSubService;
   static isCreating: Boolean = false;
   
   public changeCategory: ChangeCategoryEventEmitter;
   public gotoTab: GotoTabEventEmitter;
   public shoppingcart: ShoppingcartChangeEventEmitter;
   
   constructor(){
       if (!PubSubService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
       }
   }
   
   static getInstance() {
        if (PubSubService.instance == null) {
            PubSubService.isCreating = true;
            
            PubSubService.instance = new PubSubService();
            PubSubService.instance.changeCategory = new ChangeCategoryEventEmitter();
            PubSubService.instance.gotoTab = new GotoTabEventEmitter();
            PubSubService.instance.shoppingcart = new ShoppingcartChangeEventEmitter();
            
            PubSubService.isCreating = false;
        }
 
        return PubSubService.instance;
    }
}