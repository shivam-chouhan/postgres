export let error = document.createElement("td");
error.setAttribute("class", "invalid");
class ShowError {
    passError(errorField, content) {
        let errField = errorField.parentNode?.parentNode;
        if (content == 'phone') {
            error.textContent = "Enter the correct Phone Number";
            error.style.display = "none";
            errField.appendChild(error);
            error.style.display = "block";
        }
        else if (content == 'firstName') {
            error.textContent = "Enter the correct First Name";
            error.style.display = "none";
            errField.appendChild(error);
            error.style.display = "block";
        }
        else if (content == 'middleName') {
            error.textContent = "Enter the correct Middle Name";
            error.style.display = "none";
            errField.appendChild(error);
            error.style.display = "block";
        }
        else if (content == 'lastName') {
            error.textContent = "Enter the correct Last Name";
            error.style.display = "none";
            errField.appendChild(error);
            error.style.display = "block";
        }
        else if (content == 'email') {
            error.textContent = "Enter the correct Email";
            error.style.display = "none";
            errField.appendChild(error);
            error.style.display = "block";
        }
    }
}
export let objShowError = new ShowError();
