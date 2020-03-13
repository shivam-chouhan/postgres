import { objUserTable } from "./userView.js";
import { addEvent } from "./ButtonsAction.js";
export let urlData = 'http://localhost:5000/api/users';
export async function dataFetch() {
    let users = await fetch(urlData)
        .then(resp => { return (resp.json()); });
    objUserTable.getUsers(users);
    addEvent();
}
