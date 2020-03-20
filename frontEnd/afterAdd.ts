import { objValidation } from "./formValidation.js";
import { objUserTable } from "./userView.js";
import { error } from "./showError.js";
import { addUserBtn } from "./addUser.js";
import { DataType } from "./interface.js";
import { urlData, dataFetch } from "./DataFetch.js";

class afterAdd{
    async saveFunc(rowElement:Node){
         let users:DataType[] =  await fetch(urlData)
      .then(resp=>{return(resp.json())})

      let rowNumber= users.length;
        let result = await objValidation.formValidate(rowElement,rowNumber);
        let selectRole:HTMLSelectElement = document.getElementById("drop")as HTMLSelectElement;
        let roleData = selectRole.value;
        if(result == undefined)
        {
             objUserTable.sameRecord(rowElement,rowNumber);
            return;
         }
         else{
             error.style.display = "none";
             
             
                let firstName = (document.getElementsByClassName("inputData")[0]as HTMLInputElement).value;
                let middleName = (document.getElementsByClassName("inputData")[1]as HTMLInputElement).value;
                let lastName= (document.getElementsByClassName("inputData")[2]as HTMLInputElement).value;
                let email = (document.getElementsByClassName("inputData")[3]as HTMLInputElement).value;
                let phone = (document.getElementsByClassName("inputData")[4]as HTMLInputElement).value;
                let address = (document.getElementsByClassName("inputData")[5]as HTMLInputElement).value;
                let rollno;
             if(roleData=='ADMIN'){
                 rollno = 0;
                }
                else if(roleData=="DEVELOPER"){
                    rollno = 1;
                }
                else{
                    rollno = 2;
                }
                
                let newUser = {
                    "first_name" : firstName,
                    "middle_name" : middleName,
                    "last_name": lastName,
                    "email" : email,
                    "phone": phone,
                    "address": address,
                    "role" : rollno
                }
                
                
                console.log(newUser);
                
         fetch(`http://localhost:5000/CUops/savedata`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
          .then((response) => response.json())
          .then((addUser) => {
            console.log('Success')
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        addUserBtn.disabled=false;
        (document.getElementById("refreshData")!as HTMLButtonElement).disabled = false;
         }
    }

    cancelfunc(row:HTMLTableRowElement){
        let tableData = document.getElementById("userData");
        tableData?.removeChild(row)
        addUserBtn.disabled = false;
    }


}
export let objAfterAdd = new afterAdd();