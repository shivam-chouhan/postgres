import { Role, Customers } from "./enum.js";
import { dataFetch, urlData } from "./DataFetch.js";
import { addEvent, removeEvent } from "./ButtonsAction.js";
import { objValidation } from "./formValidation.js";
import { error } from "./showError.js";
import { addUserBtn, objAddUser } from "./addUser.js";
export class UserTable {
    getUsers(users) {
        document.getElementById("loadData").style.display = "none";
        document.getElementById("refreshData").style.display = "block";
        document.getElementById("table").style.visibility = "visible";
        addUserBtn.style.display = "block";
        let tableData = document.getElementById("userData");
        for (let i = 0; i < users.length; i++) {
            let row = tableData.insertRow();
            row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].first_name}</span>`;
            row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].middle_name}</span>`;
            row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].last_name}</span>`;
            row.insertCell().innerHTML = `<span id = "customer${users[i].id}"> ${Customers[users[i].customer_id]}</span>`;
            row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].email}</span>`;
            row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].phone}</span>`;
            row.insertCell().innerHTML = `<span id = "role${users[i].id}"> ${Role[users[i].role_id]}</span>`;
            row.insertCell().innerHTML = `<span class = "element${users[i].id}"> ${users[i].address}</span>`;
            row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "edit${users[i].id}" value = "EDIT" >`;
            row.insertCell().innerHTML = `<input type = "button" class = "w3-button deleteBtn" id = "delete${users[i].id}" value = "DELETE" >`;
        }
    }
    async deleteRecord(row, idNo) {
        let table = document.getElementById("userData");
        let current = objUserTable.currentRow(row);
        let deleteUrl = `http://localhost:5000/deleteRow/users${idNo}`;
        fetch(deleteUrl)
            .catch((error) => {
            console.error('Error:', error);
        });
        table.deleteRow(current);
    }
    editRecord(rowElement, rowNumber) {
        removeEvent();
        let cloneData = [];
        let editButton = document.getElementById("edit" + rowNumber);
        editButton.setAttribute("value", "SAVE");
        async function pass() {
            await objUserTable.saveRecord({ rowElement, rowNumber, cloneData });
        }
        editButton.onclick = pass;
        let deleteButton = document.getElementById("delete" + rowNumber);
        deleteButton.setAttribute("value", "CANCEL");
        deleteButton.onclick = function () {
            objUserTable.cancel(cloneData, rowNumber, roleData, customerData);
        };
        for (let i = 0; i < 6; i++) {
            let selectedElements = document.getElementsByClassName("element" + rowNumber)[i];
            cloneData[i] = selectedElements.textContent;
            selectedElements.innerHTML = `<input class = "inputData" type = "text" placeholder ="Enter the Text"  value = "${cloneData[i]}">`;
        }
        let roleOption = document.getElementById("role" + rowNumber);
        let customerOption = document.getElementById("customer" + rowNumber);
        let customerData = customerOption.innerHTML;
        customerOption.innerHTML = `<select id = "drop1"><option>${customerData}</option><option>AMAZON</option><option>GOOGLE</option><option>UDEMY</option></select>`;
        let roleData = roleOption.innerHTML;
        roleOption.innerHTML = `<select id ="drop"><option>${roleData}</option><option>ADMIN</option><option>DEVELOPER</option><option>MANAGER</option></select>`;
    }
    cancel(cloneData, rowNumber, roleData, customerData) {
        for (let i = 0; i < 6; i++) {
            let selectedElements = document.getElementsByClassName("element" + rowNumber)[i];
            selectedElements.innerHTML = cloneData[i];
        }
        let role = document.getElementById("role" + rowNumber);
        let customer = document.getElementById("customer" + rowNumber);
        role.innerHTML = roleData;
        customer.innerHTML = customerData;
        let editButton = document.getElementById("edit" + rowNumber);
        editButton.setAttribute("value", "EDIT");
        editButton.removeAttribute('click');
        let deleteButton = document.getElementById("delete" + rowNumber);
        deleteButton.setAttribute("value", "DELETE");
        error.style.display = "none";
        addUserBtn.disabled = false;
        document.getElementById("refreshData").disabled = false;
        setTimeout(addEvent, 400);
    }
    currentRow(rowElement) {
        let currentRow = rowElement.parentNode.parentNode.rowIndex - 1;
        return currentRow;
    }
    async saveRecord({ rowElement, rowNumber, cloneData }) {
        let result = await objValidation.formValidate(rowElement, rowNumber);
        let selectRole = document.getElementById("drop");
        let selectCustomer = document.getElementById("drop1");
        let roleData = selectRole.value;
        let customerData = selectCustomer.value;
        let role = document.getElementById("role" + rowNumber);
        let customer = document.getElementById("customer" + rowNumber);
        if (result == undefined) {
            objUserTable.sameRecord(rowElement, rowNumber);
            return;
        }
        else {
            role.innerHTML = roleData;
            customer.innerHTML = customerData;
            error.style.display = "none";
            let users = await fetch(urlData)
                .then(resp => { return (resp.json()); });
            let ID = objUserTable.currentRow(rowElement);
            let firstName = document.getElementsByClassName("inputData")[0].value;
            let middleName = document.getElementsByClassName("inputData")[1].value;
            let lastName = document.getElementsByClassName("inputData")[2].value;
            let email = document.getElementsByClassName("inputData")[3].value;
            let phone = document.getElementsByClassName("inputData")[4].value;
            let address = document.getElementsByClassName("inputData")[5].value;
            let rollno;
            if (roleData == 'ADMIN') {
                rollno = 0;
            }
            else if (roleData == "DEVELOPER") {
                rollno = 1;
            }
            else {
                rollno = 2;
            }
            let customerno;
            if (customerData == 'AMAZON') {
                customerno = 0;
            }
            else if (customerData == 'GOOGLE') {
                customerno = 1;
            }
            else {
                customerno = 2;
            }
            let updateuser = {
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
                "address": address,
                "role_id": rollno,
                "customer_id": customerno
            };
            document.getElementsByClassName("element" + rowNumber)[0].innerHTML = firstName;
            document.getElementsByClassName("element" + rowNumber)[1].innerHTML = middleName;
            document.getElementsByClassName("element" + rowNumber)[2].innerHTML = lastName;
            document.getElementsByClassName("element" + rowNumber)[3].innerHTML = email;
            document.getElementsByClassName("element" + rowNumber)[4].innerHTML = phone;
            document.getElementsByClassName("element" + rowNumber)[5].innerHTML = address;
            fetch(`http://localhost:5000/CUops/updateuser${users[ID].id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateuser),
            })
                .then((response) => response.json())
                .then((addUser) => {
                console.log('Success');
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            let saveButton = document.getElementById("edit" + rowNumber);
            saveButton.setAttribute("value", "EDIT");
            let deleteButton = document.getElementById("delete" + rowNumber);
            deleteButton.setAttribute("value", "DELETE");
            addUserBtn.disabled = false;
            document.getElementById("refreshData").disabled = false;
            setTimeout(addEvent, 400);
        }
    }
    sameRecord(rowElement, rowNumber) {
        let cloneData = [];
        let editButton = document.getElementById("edit" + rowNumber);
        editButton.setAttribute("value", "SAVE");
        async function pass() {
            await objUserTable.saveRecord({ rowElement, rowNumber, cloneData });
        }
        editButton.onclick = pass;
    }
    refreshTable() {
        let table = document.getElementById("userData");
        table.innerHTML = "";
        addUserBtn.disabled = false;
        dataFetch();
        removeEvent();
        addEvent();
    }
}
export let objUserTable = new UserTable();
objAddUser.addUserButton();
