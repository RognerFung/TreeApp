import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'operator'
})
export class OperatorPipe implements PipeTransform {

    transform(question: string): string {
        var sptMulti = question.split("*");
        var transMulti = sptMulti.reduce((total, ele) => {
            return total + "&times;" + ele;
        });
        var sptDiv = transMulti.split("/");
        var transDiv = sptDiv.reduce((total, ele) => {
            return total + "&div;" + ele;
        });
        const tempElement = document.createElement("div")
        tempElement.innerHTML = transDiv;
        return tempElement.innerText
    }
}
