import { dataFetch } from "./DataFetch.js";
import { objUserTable } from "./userView.js";
import { objClassGetID } from "./GetID.js";
let loadDataBtn = document.getElementById("loadData");
loadDataBtn.onclick = dataFetch;
let refreshBtn = document.getElementById("refreshData");
refreshBtn.onclick = objUserTable.refreshTable;
export let clickable = function (e) {
    objFindID.listen(e);
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
        let eid = event.target.id;
        if (eid) {
            objClassGetID.passID(eid);
            console.log(eid);
        }
    }
}
export let objFindID = new FindID();
