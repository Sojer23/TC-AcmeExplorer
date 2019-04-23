import { ActorService } from "../services/actor.service";
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export function existingPhoneNumberValidator(actorService: ActorService):AsyncValidatorFn{
    return /*(control:AbstractControl): Promise<ValidationErrors |null> | Observable<ValidationErrors | null>=>{
        return actorService.getActorPhoneNumber(control.value).then((phone)=>{
            if(phone.length >0){
                return {'phoneNumberExists': true};
            }else{
                return null;
            }
        });
    }*/
}