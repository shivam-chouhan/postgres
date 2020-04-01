import { objValidation } from "./formValidation.js";
import { objUserTable } from "./userView.js";
import { error } from "./showError.js";
import { addUserBtn } from "./addUser.js";
import { urlData } from "./DataFetch.js";
class afterAdd {
    async saveFunc(rowElement) {
        let users = await fetch(urlData)
            .then(resp => { return (resp.json()); });
        let rowNumber = users.length;
        let result = await objValidation.formValidate(rowElement, rowNumber);
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
            let newUser = {
                "first_name": firstName.trim(),
                "middle_name": middleName.trim(),
                "last_name": lastName.trim(),
                "email": email.trim(),
                "phone": phone.trim(),
                "address": address.trim(),
                "role_id": rollno,
                "customer_id": customerno
            };
            console.log(newUser);
            fetch(`http://localhost:5000/CUops/savedata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then((response) => response.json())
                .then((addUser) => {
                console.log('Success');
            })
                .catch((error) => {
                console.error('Error:', error);
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
export let objAfterAdd = new afterAdd();
