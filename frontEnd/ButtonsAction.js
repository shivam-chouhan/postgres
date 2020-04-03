import { dataFetch } from "./DataFetch.js";
import { objUserTable } from "./userView.js";
import { objClassGetID } from "./GetID.js";
let loadDataBtn = document.getElementById("loadData");
loadDataBtn.onclick = dataFetch;
let refreshBtn = document.getElementById("refreshData");
refreshBtn.onclick = objUserTable.refreshTable;
export let clickable = function (event) {
    objFindID.listen(event);
};
export let tableWhole = document.getElementById("table");
export function addEvent() {
    tableWhole.addEventListener("click", clickable);
}
export function removeEvent() {
    tableWhole.removeEventListener("click", clickable);
}
class FindID {
    listen(event) {
        let elementId = event.target.id;
        if (elementId) {
            objClassGetID.passID(elementId);
        }
    }
}
export let objFindID = new FindID();
