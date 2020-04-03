import { objAfterAdd } from "./afterAdd.js";
import { dataFetch } from "./DataFetch.js";
export let addUserBtn = document.createElement('button');
class AddUser {
    addUserButton() {
        addUserBtn.innerHTML = 'ADD USER';
        addUserBtn.setAttribute('class', 'w3-button refresh');
        document.body.appendChild(addUserBtn);
        addUserBtn.style.display = 'none';
        addUserBtn.onclick = async function () {
            objAddUser.addUserData();
        };
    }
    async addUserData() {
        let tableData = document.getElementById('userData');
        let row = tableData.insertRow();
        row.insertCell().innerHTML = `<input type ="text" placeholder = "Enter the first name" class = "inputData">`;
        row.insertCell().innerHTML = `<input type ="text" placeholder = "Enter the middle name" class = "inputData">`;
        row.insertCell().innerHTML = `<input type ="text" placeholder = "Enter the last name" class = "inputData">`;
        row.insertCell().innerHTML = `<select id = "drop1"><option>AMAZON</option><option>GOOGLE</option><option>UDEMY</option></select>`;
        row.insertCell().innerHTML = `<input type ="text" placeholder = "Enter the email" class = "inputData">`;
        row.insertCell().innerHTML = `<input type ="text" placeholder = "Enter the phone number" class = "inputData">`;
        row.insertCell().innerHTML = `<select id ="drop"><option>ADMIN</option><option>DEVELOPER</option><option>MANAGER</option></select>`;
        row.insertCell().innerHTML = `<input type ="text" placeholder = "Enter the address" class = "inputData">`;
        row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "save" value = "SAVE" >`;
        row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "cancel" value = "CANCEL" >`;
        let savebtn = document.getElementById('save');
        addUserBtn.disabled = true;
        let rowElement = savebtn.parentNode?.parentNode;
        savebtn.onclick = async function () {
            await objAfterAdd.saveFunc(rowElement);
            tableData.innerHTML = "";
            dataFetch();
        };
        let cancelbtn = document.getElementById('cancel');
        cancelbtn.onclick = function () {
            objAfterAdd.cancelfunc(row);
        };
    }
}
export let objAddUser = new AddUser();
