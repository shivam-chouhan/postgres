export let error = document.createElement("td");
error.setAttribute("class", "invalid");
class ShowError {
    passPhone(phone) {
        let phoneField = phone.parentNode?.parentNode;
        error.textContent = "Enter the correct Phone Number";
        error.style.display = "none";
        phoneField.appendChild(error);
        error.style.display = "block";
    }
    passFirst(firstName) {
        let nameField = firstName.parentNode?.parentNode;
        error.textContent = "Enter the correct First Name";
        error.style.display = "none";
        nameField.appendChild(error);
        error.style.display = "block";
    }
    passMiddle(middleName) {
        let nameField = middleName.parentNode?.parentNode;
        error.textContent = "Enter the correct Middle Name";
        error.style.display = "none";
        nameField.appendChild(error);
        error.style.display = "block";
    }
    passLast(lastName) {
        let nameField = lastName.parentNode?.parentNode;
        error.textContent = "Enter the correct Last Name";
        error.style.display = "none";
        nameField.appendChild(error);
        error.style.display = "block";
    }
    passEmail(email) {
        let emailField = email.parentNode?.parentNode;
        error.textContent = "Enter the correct Email";
        error.style.display = "none";
        emailField.appendChild(error);
        error.style.display = "block";
    }
}
export let objShowError = new ShowError();
