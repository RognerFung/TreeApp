import { Component, OnInit, Input } from '@angular/core';
import { Example } from '../example';
import { ActivatedRoute } from '@angular/router';
import { BranchService }  from '../branch.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  @Input() example: Example;

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    this.getExampleByFruitId();
  }

  getExampleByFruitId(): void {
    const fruitId = this.route.snapshot.paramMap.get('fruitId');
    this.branchService.getExampleByFruitId(fruitId)
      .subscribe(example => this.example = example);
  }

}
