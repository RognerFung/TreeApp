import { Component, OnInit, Input } from '@angular/core';
import { Fruit } from '../fruit';
import { ActivatedRoute } from '@angular/router';
import { BranchService }  from '../branch.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css']
})

export class FruitComponent implements OnInit {

  divs: Array<number[]>;
  selectedItems: string[] = [];
  cache: any;

  @Input() fruit: Fruit;

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getFruitByFruitId();
    this.divDistribute();
  }

  getFruitByFruitId(): void {
    const fruitId = this.route.snapshot.paramMap.get('fruitId');
    this.branchService.getFruitByFruitId(fruitId)
      .subscribe(fruit => this.fruit = fruit);
  }

  divDistribute(): void {
    this.divs = this.branchService.divDistribute(this.fruit.content.length);
  }

  selectItem(item: string): void {
    if (this.selectedItems.indexOf(item) === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    }
  }
}
