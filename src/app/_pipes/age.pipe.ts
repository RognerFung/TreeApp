import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})

export class AgePipe implements PipeTransform {

    transform(age: string): string {
        var cAge: string;
        switch(age) {
            case("2 Months"): return "2个月";
            case("4 Months"): return "4个月";
            case("6 Months"): return "6个月";
            case("9 Months"): return "9个月";
            case("1 Year"): return "1岁";
            case("18 Months"): return "18个月";
            case("2 Years"): return "2岁";
            case("3 Years"): return "3岁";
            case("4 Years"): return "4岁";
            case("5 Years"): return "5岁";
        }
    }
}
