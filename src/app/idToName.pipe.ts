import { Pipe, PipeTransform } from '@angular/core';
import { Branch } from './branch';
import { BRANCHES } from './mock-branches';
import { Fruit } from './fruit';
import { FRUITS } from './mock-fruits';

@Pipe({name: 'idToName'})
export class IdToNamePipe implements PipeTransform {
  transform(id: string): string {
    return (BRANCHES.find(branch => id === branch.id) === undefined) ? FRUITS.find(fruit => id === fruit.id).name : BRANCHES.find(branch => id === branch.id).name;
  }
}