import { DataTypeOfUser } from "./interface.js";
import { Role } from "./enum.js";
import {dataFetch, urlData } from "./DataFetch.js";
import { addEvent,removeEvent} from "./ButtonsAction.js";
import { objValidation } from "./formValidation.js";
import { error } from "./showError.js";
import { addUserBtn, objAddUser } from "./addUser.js";


export class UserTable{
    getUsers(users:DataTypeOfUser[]){
       document.getElementById("loadData")!.style.display="none";
       document.getElementById("refreshData")!.style.display="block";
       document.getElementById("table")!.style.visibility="visible";
       addUserBtn.style.display="block";
    let tableData: HTMLTableElement = document.getElementById("userData") as HTMLTableElement;
       for(let i=0;i<users.length;i++)
       {
           let row:HTMLTableRowElement = tableData.insertRow();
           row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].first_name}</span>`
                 row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].middle_name}</span>`
                 row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].last_name}</span>`
                 row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].email}</span>`
                 row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].phone}</span>`
                 row.insertCell().innerHTML = `<span id = "role${users[i].id}"> ${Role[users[i].role]}</span>`
                 row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].address}</span>`
                 row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "edit${users[i].id}" value = "EDIT" >`;
                 row.insertCell().innerHTML = `<input type = "button" class = "w3-button deleteBtn" id = "delete${users[i].id}" value = "DELETE" >`;
       }
       
   }
   async deleteRecord(row:Node , idNo : number){

    let table :HTMLTableElement= document.getElementById("userData") as HTMLTableElement;
    let current:number = objUserTable.currentRow(row);
    let deleteUrl = `http://localhost:5000/deleteRow/getUsers/${idNo}`;
     fetch(deleteUrl)
     table.deleteRow(current);
    
 }

    editRecord(rowElement:Node, rowNumber:number){
       removeEvent();
       let cloneData:Array<string>=[];
       let editButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
       editButton.setAttribute("value", "SAVE");
     async function  pass (){
        await objUserTable.saveRecord({rowElement,rowNumber,cloneData});
        
    }
       editButton.onclick = pass;
       
       let deleteButton:HTMLButtonElement = document.getElementById("delete"+rowNumber) as HTMLButtonElement;
       deleteButton.setAttribute("value","CANCEL");
       deleteButton.onclick = function(){
           objUserTable.cancel(cloneData,rowNumber,roleData);
       }
       for(let i=0;i<6;i++)
       {
           let selectedElements=document.getElementsByClassName("element"+rowNumber)[i];
           cloneData[i]=selectedElements.textContent!;
           selectedElements.innerHTML = `<input class = "inputData" type = "text" placeholder ="Enter the Text"  value = "${cloneData[i]}">`
       }
       let roleOption:HTMLTableRowElement = document.getElementById("role"+rowNumber) as HTMLTableRowElement;
       let roleData=roleOption.innerHTML;
       roleOption.innerHTML=`<select id ="drop"><option>${roleData}</option><option>ADMIN</option><option>DEVELOPER</option><option>MANAGER</option></select>`
   }
   cancel(cloneData:string[], rowNumber:number,roleData:string){
       for(let i=0;i<6;i++)
       {
           let selectedElements = document.getElementsByClassName("element"+rowNumber)[i];
           selectedElements.innerHTML = cloneData[i];
       }
       let role :HTMLTableRowElement= document.getElementById("role"+rowNumber)as HTMLTableRowElement;
       role.innerHTML = roleData;
       let editButton :HTMLButtonElement=document.getElementById("edit"+rowNumber) as HTMLButtonElement;
       editButton.setAttribute("value", "EDIT");
       editButton.removeAttribute('click')
       let deleteButton:HTMLButtonElement=document.getElementById("delete"+rowNumber) as HTMLButtonElement;
       deleteButton.setAttribute("value","DELETE");
       error.style.display = "none";
       addUserBtn.disabled=false;
       (document.getElementById("refreshData")!as HTMLButtonElement).disabled = false;
           setTimeout(addEvent,400);
   }
   currentRow(rowElement:Node){
       let currentRow :number= ((rowElement.parentNode as HTMLTableElement).parentNode as HTMLTableRowElement).rowIndex-1;
       return currentRow;
   }
   async saveRecord({ rowElement,rowNumber, cloneData }: {  rowElement:Node;rowNumber: number; cloneData: string[]; }){
       let result = await objValidation.formValidate(rowElement,rowNumber);
       let selectRole:HTMLSelectElement = document.getElementById("drop")as HTMLSelectElement;
       let roleData = selectRole.value;
       let role :HTMLTableRowElement= document.getElementById("role"+rowNumber) as HTMLTableRowElement;
       if(result == undefined)
       {
            objUserTable.sameRecord(rowElement,rowNumber);
           return;
        }
        else{
        role.innerHTML = roleData;
        error.style.display = "none";
        let users:DataTypeOfUser[] =  await fetch(urlData)
        .then(resp=>{return(resp.json())})
        let ID = objUserTable.currentRow(rowElement);

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

        let updateuser = {
            "first_name" : firstName,
            "middle_name" : middleName,
            "last_name": lastName,
            "email" : email,
            "phone": phone,
            "address": address,
            "role": rollno
        }


        document.getElementsByClassName("element"+rowNumber)[0].innerHTML = firstName;
        document.getElementsByClassName("element"+rowNumber)[1].innerHTML = middleName;
        document.getElementsByClassName("element"+rowNumber)[2].innerHTML = lastName;
        document.getElementsByClassName("element"+rowNumber)[3].innerHTML = email;
        document.getElementsByClassName("element"+rowNumber)[4].innerHTML = phone;
        document.getElementsByClassName("element"+rowNumber)[5].innerHTML = address;




        fetch(`http://localhost:5000/CUops/updateUser/${users[ID].id}`, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updateuser),
})
       let saveButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
       saveButton.setAttribute("value", "EDIT");
       let deleteButton:HTMLButtonElement=document.getElementById("delete"+rowNumber)as HTMLButtonElement;
       deleteButton.setAttribute("value", "DELETE");
       addUserBtn.disabled=false;
       (document.getElementById("refreshData")!as HTMLButtonElement).disabled = false;
    setTimeout(addEvent,400);
        }
    
  }
  sameRecord(rowElement:Node,rowNumber:number){
    let cloneData:Array<string>=[];
    let editButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
    editButton.setAttribute("value", "SAVE");
  async function  pass (){
     await objUserTable.saveRecord({rowElement,rowNumber,cloneData});}
    editButton.onclick = pass;
    }

  

   refreshTable(){
       let table:HTMLTableElement= document.getElementById("userData") as HTMLTableElement;
       table.innerHTML="";
       addUserBtn.disabled = false;
       dataFetch();
       removeEvent();
       addEvent();
   }
}
export let objUserTable = new UserTable();
objAddUser.addUserButton();

