import { dataFetch } from "./DataFetch.js";
import { objUserTable } from "./userView.js";
import { objClassGetID } from "./GetID.js";
let loadDataBtn:HTMLButtonElement = document.getElementById("loadData")as HTMLButtonElement;
loadDataBtn.onclick = dataFetch;
let refreshBtn :HTMLButtonElement = document.getElementById("refreshData")as HTMLButtonElement;
refreshBtn.onclick = objUserTable.refreshTable;

export let clickable = function(e:MouseEvent){
    objFindID.listen(e);
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
        let eid = (event.target as HTMLInputElement).id;
        if(eid)
        {
        objClassGetID.passID(eid);
        console.log(eid)
}}
}
export let objFindID = new FindID();