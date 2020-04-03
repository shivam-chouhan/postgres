import { objShowError } from "./showError.js";

class Validate {
    validateUser(user:string ,content:string ){
        let firstNameRGEX = /[A-z]{1,10}$/;
        let emailRGEX = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        let phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        if(content =='firstNlast'){
        let firstNameResult = firstNameRGEX.test(user.trim());
    return firstNameResult;
    }
        else if(content == 'email'){
            let emailResult = emailRGEX.test(user.trim()); 
        return emailResult;
        }
        else if(content == 'phone'){
            let phoneResult = phoneRGEX.test(user.trim());
    return phoneResult;
        } 
    }
    async formValidate(){
let firstName = (document.getElementsByClassName("inputData")[0]as HTMLInputElement);
let middleName = (document.getElementsByClassName("inputData")[1]as HTMLInputElement);
let lastName= (document.getElementsByClassName("inputData")[2]as HTMLInputElement);
let email = (document.getElementsByClassName("inputData")[3]as HTMLInputElement);
let phone = (document.getElementsByClassName("inputData")[4]as HTMLInputElement);
    let phoneResult = objValidation.validateUser(phone.value,'phone');
    if(!phoneResult)
    {
        objShowError.passError(phone,'phone');
    }
    let firstNameResult = this.validateUser(firstName.value,'firstNlast');
    if(!firstNameResult)
    {
        objShowError.passError(firstName,'firstName'); 
    }
    let middleNameResult = this.validateUser(middleName.value,'firstNlast');
    if(middleNameResult||middleName.value.trim()==""){
        middleNameResult= true;
    }
    else{
        objShowError.passError(middleName,'middleName');
    }
    let lastNameResult = this.validateUser(lastName.value,'firstNlast');
    if(!lastNameResult){
        objShowError.passError(lastName,'lastName'); 
    }
    let emailResult = this.validateUser(email.value,'email');
    if(!emailResult)
    {
        objShowError.passError(email,'email');
    }
    if(phoneResult===false||firstNameResult===false||middleNameResult===false||lastNameResult===false||emailResult===false){
        return;
    }
    else{
        return 1;
    }
    }
    
}
export let objValidation = new Validate();
