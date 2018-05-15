import { Injectable } from '@angular/core';
import { Branch } from './branch';
import { Fruit } from './fruit';
import { Example } from './example';
import { BRANCHES } from './mock-branches';
import { FRUITS } from './mock-fruits';
import { EXAMPLES } from './mock-examples';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class BranchService {

    constructor(
        private route: ActivatedRoute
    ) {}

    getBranches(): Observable<Branch[]> {
        return of(BRANCHES);
    }

    getBranchById(id: string): Observable<Branch> {
        return of(BRANCHES.find(branch => branch.id === id));
    }

    getFruitByBranchId(id: string): Observable<Fruit[]> {
        return of(FRUITS.filter(fruit => fruit.branch.indexOf(id) !== -1));
    }

    getFruitByFruitId(id: string): Observable<Fruit> {
        return of(FRUITS.find(fruit => fruit.id === id ));
    }

    getExampleByFruitId(id: string): Observable<Example> {
        return of(EXAMPLES.find(example => example.fruitId === id));
    }

    divDistribute(num: number): Array<number[]> {
        var col = Math.ceil(Math.sqrt(num));
        var row = Math.floor(Math.sqrt(num));
        var x = num - col * row;
        var a = new Array(col);
        a[0] = new Array(2);
        a[0][0] = 0;
        a[0][1] = row + Math.abs(x) / x;
        for (var i = 1; i < Math.abs(x); i++) {
            a[i] = new Array(2);
            a[i][0] = a[i - 1][1];
            a[i][1] = a[i - 1][1] + row + Math.abs(x) / x;
        }
        for (var i = Math.abs(x); i < col; i++) {
            a[i] = new Array(2);
            a[i][0] = a[i - 1][1];
            a[i][1] = a[i - 1][1] + row;
        }
        return a;
    }
}
