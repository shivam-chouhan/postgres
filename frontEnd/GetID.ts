import { objUserTable } from "./userView.js";
export class ClassGetID{
    passID(ID:string){
    let length = ID.length;
    let IDno =ID.charAt(length-1);
    if((ID.charAt(length-2)+ID.charAt(length-1))<='99'){
        IDno = ID.charAt(length-2)+ID.charAt(length-1);
    }
    else if(ID.charAt(length-3)+ID.charAt(length-2)+ID.charAt(length-1)<='999'){
        IDno = ID.charAt(length-3)+ID.charAt(length-2)+ID.charAt(length-1);
    }
    
    if(ID=="delete"+(IDno)){
        let rowElement :Node= document.getElementById(ID)!;
        console.log(rowElement)
        objUserTable.deleteRecord(rowElement, parseInt(IDno))
        console.log(parseInt(IDno))
    }
    else if(ID=="edit"+(IDno)){
        let rowElement:Node=document.getElementById(ID)!;
        let rowNumber = parseInt(IDno)
        objUserTable.editRecord(rowElement , rowNumber);
    }
    }
}
export let objClassGetID = new ClassGetID();