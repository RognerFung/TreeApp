import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Branch } from '../branch';
import { Fruit } from '../fruit';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BranchService }  from '../branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  branchId: string = this.route.snapshot.paramMap.get('branchId');

  @Input() branch: Branch;
  @Input() fruits: Fruit[];
  
  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getBranchById();
    this.getFruitByBranchId();
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.get('branchId') !== this.branchId) {
      this.branchId = this.route.snapshot.paramMap.get('branchId');
      this.getBranchById();
      this.getFruitByBranchId();
    }
  }

  getBranchById(): void {
    const newBranchId = this.route.snapshot.paramMap.get('branchId');
    this.branchService.getBranchById(newBranchId)
      .subscribe(branch => this.branch = branch);
  }

  getFruitByBranchId(): void {
    const newBranchId = this.route.snapshot.paramMap.get('branchId');
    this.branchService.getFruitByBranchId(newBranchId)
      .subscribe(fruit => this.fruits = fruit);
  }

  

  // getBranchId(name: string): number {
  //   var id;
  //   this.branchService.getBranchId(name)
  //     .subscribe(branch => id = branch.id);
  //   return id;
  // }

  // generateURL(name: string): string {
  //   var id;
  //   this.branchService.getBranchId(name)
  //     .subscribe(branch => id = branch.id);
  //   return '/tree/' + id;
  // }
}
