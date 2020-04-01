import { objValidation } from "./formValidation.js";
import { objUserTable } from "./userView.js";
import { error } from "./showError.js";
import { addUserBtn } from "./addUser.js";
import { urlData } from "./DataFetch.js";
import { Role, Customers } from "./enum.js";
class AfterAdd {
    async saveFunc(rowElement) {
        let users = await fetch(urlData)
            .then(resp => { return (resp.json()); });
        let rowNumber = users.length;
        let result = await objValidation.formValidate();
        let selectRole = document.getElementById("drop");
        let selectCustomer = document.getElementById("drop1");
        let customerData = selectCustomer.value;
        let roleData = selectRole.value;
        if (result == undefined) {
            objUserTable.sameRecord(rowElement, rowNumber);
            return;
        }
        else {
            error.style.display = "none";
            let enteredData = [];
            for (let i = 0; i < 6; i++) {
                enteredData[i] = document.getElementsByClassName("inputData")[i].value;
            }
            ;
            let rollno;
            if (roleData == 'ADMIN') {
                rollno = Role.ADMIN;
            }
            else if (roleData == "DEVELOPER") {
                rollno = Role.DEVELOPER;
            }
            else {
                rollno = Role.MANAGER;
            }
            let customerno;
            if (customerData == 'AMAZON') {
                customerno = Customers.AMAZON;
            }
            else if (customerData == 'GOOGLE') {
                customerno = Customers.GOOGLE;
            }
            else {
                customerno = Customers.UDEMY;
            }
            let newUser = {
                "firstName": enteredData[0].trim(),
                "middleName": enteredData[1].trim(),
                "lastName": enteredData[2].trim(),
                "email": enteredData[3].trim(),
                "phone": enteredData[4].trim(),
                "address": enteredData[5].trim(),
                "roleId": rollno,
                "customerId": customerno
            };
            await fetch(`http://localhost:5000/CUops/saveUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            addUserBtn.disabled = false;
            document.getElementById("refreshData").disabled = false;
        }
    }
    cancelfunc(row) {
        let tableData = document.getElementById("userData");
        tableData?.removeChild(row);
        addUserBtn.disabled = false;
    }
}
export let objAfterAdd = new AfterAdd();
