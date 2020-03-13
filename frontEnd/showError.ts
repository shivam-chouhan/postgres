export let error = document.createElement("td");
error.setAttribute("class", "invalid");
class ShowError{
    passPhone(phone:HTMLInputElement){
        let phoneField = phone.parentNode?.parentNode as HTMLTableRowElement;
        error.textContent = "Enter the correct Phone Number"
        error.style.display = "none";
        phoneField.appendChild(error);
        error.style.display = "block";

    }
    passFirst(firstName:HTMLInputElement){
        let nameField = firstName.parentNode?.parentNode as HTMLTableRowElement;
        error.textContent = "Enter the correct First Name"
        error.style.display = "none";
        nameField.appendChild(error);
        error.style.display = "block";

    }
    passMiddle(middleName:HTMLInputElement){
        let nameField = middleName.parentNode?.parentNode as HTMLTableRowElement;
        error.textContent = "Enter the correct Middle Name"
        error.style.display = "none";
        nameField.appendChild(error);
        error.style.display = "block";


    }
    passLast(lastName:HTMLInputElement){
        let nameField = lastName.parentNode?.parentNode as HTMLTableRowElement;
        error.textContent = "Enter the correct Last Name"
        error.style.display = "none";
        nameField.appendChild(error);
        error.style.display = "block";


    }
    passEmail(email:HTMLInputElement){
        let emailField = email.parentNode?.parentNode as HTMLTableRowElement;
        error.textContent = "Enter the correct Email"
        error.style.display = "none";
        emailField.appendChild(error);
        error.style.display = "block";


    }
}
export let objShowError = new ShowError();