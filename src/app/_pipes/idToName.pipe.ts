import { Pipe, PipeTransform } from '@angular/core';
import { Branch } from '../_statics/branch';
import { BRANCHES } from '../_statics/mock-branches';
import { Fruit } from '../_statics/fruit';
import { FRUITS } from '../_statics/mock-fruits';

@Pipe({name: 'idToName'})
export class IdToNamePipe implements PipeTransform {
    transform(id: string): string {
        return (BRANCHES.find(branch => id === branch.id) === undefined) ? FRUITS.find(fruit => id === fruit.id).name : BRANCHES.find(branch => id === branch.id).name;
    }
}