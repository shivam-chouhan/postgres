import { dataFetch } from "./DataFetch.js";
import { objUserTable } from "./userView.js";
import { objClassGetID } from "./GetID.js";
let loadDataBtn:HTMLButtonElement = document.getElementById("loadData")as HTMLButtonElement;
loadDataBtn.onclick = dataFetch;
let refreshBtn :HTMLButtonElement = document.getElementById("refreshData")as HTMLButtonElement;
refreshBtn.onclick = objUserTable.refreshTable;

export let clickable = function(event:MouseEvent){
    objFindID.listen(event);
}

export let tableWhole:HTMLTableElement = document.getElementById("table")as HTMLTableElement;
export function addEvent(){
    tableWhole.addEventListener("click", clickable);
}
export function removeEvent(){
    tableWhole.removeEventListener("click", clickable);
}

class FindID{
     listen(event:MouseEvent){
        let elementId = (event.target as HTMLInputElement).id;
        if(elementId)
        {
        objClassGetID.passID(elementId);
}}
}
export let objFindID = new FindID();