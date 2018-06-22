import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-skillchart',
    templateUrl: './skillchart.component.html',
    styleUrls: ['./skillchart.component.css']
})
export class SkillchartComponent implements OnInit {

    @Input() data: any;
    scale: number = 150;//正多边形边长
    margin: number = 30;//标注文字距离svg边缘距离，等于标文字距离正多边形距离
    textLength: number = 35;//标注文字指定长度
    textHeight: number = 15;//标注文字高度
    drawM: string;//正多边形绘制点集string
    drawP: string;//闭合曲线绘制路径string
    viewBox: string;//svg尺度
    c: any;//正多边形中心点坐标
    r: number = this.scale / 20;//正多边形顶点和中心点处圆形的半径
    
    constructor() { }

    ngOnInit() {
        this.polygon();//由data生成正多边形数据
    }

    //生成正多边形的函数，其中k为闭合曲线弯曲程度参数
    polygon = (data: any = this.data, k: number = 0.2, scale: number = this.scale, margin: number = this.margin, textLength: number = this.textLength, textHeight: number = this.textHeight) => {
        var n = data.length;//正多边形顶点数目
        var a = Math.PI / n;//正多边形外角
        var p0: any = {//正多边形最高的顶点作为起始点
            x: scale * data.length / 4,
            y: margin * 2 + textHeight
        };
        //svg最小宽度1000，宽度和高度适应scale大小
        this.viewBox = "0 0 " + (scale * data.length / 2 > 1000 ? scale * data.length / 2 : "1000") + " " + scale * data.length / 2;
    
        data[0].m = {//正多边形起始顶点
            x: p0.x,
            y: p0.y
        };
        this.c = {
            x: p0.x,
            y: p0.y + scale / (2 * Math.cos(Math.PI / 2 - a))
        }
        var c = this.c;
        data[0].t = {//正多边形起始点标注文字坐标
            x: p0.x - textLength / 2,
            y: p0.y - margin
        };
        data[0].p = {//闭合曲线点在顶点和中心点的连线上，距中心点的距离等于顶点距中心点的距离乘以分数
            x: (data[0].m.x - c.x) * data[0].score + c.x,
            y: (data[0].m.y - c.y) * data[0].score + c.y
        }
        var drawM: string = "" + p0.x + "," + p0.y + " ";//绘制正多边形顶点，从最高顶点开始
        for (var i = 1; i < n; i++) {
            data[i].m = {//下一个顶点可以通过上一个顶点与边长和外角的运算得到
                x: data[i - 1].m.x + scale * Math.cos(a * (i * 2 - 1)),
                y: data[i - 1].m.y + scale * Math.sin(a * (i * 2 - 1))
            }
            drawM += data[i].m.x + "," + data[i].m.y + " ";//绘制每个顶点
            if (i === n / 2) {//偶数正多边线存在最低顶点，其标注文字点在下方
                data[i].t = {
                    x: data[i].m.x - textLength / 2,
                    y: data[i].m.y + margin + textHeight
                };
            } else if (i < n / 2) {//右边顶点的标注文字点在右侧
                data[i].t = {
                    x: data[i].m.x + margin,
                    y: data[i].m.y + textHeight / 2
                };
            } else {//左边顶点的标注文字点在左侧
                data[i].t = {
                    x: data[i].m.x - margin - textLength,
                    y: data[i].m.y + textHeight / 2
                };
            }
            data[i].p = {//每个闭合曲线点
                x: (data[i].m.x - c.x) * data[i].score + c.x,
                y: (data[i].m.y - c.y) * data[i].score + c.y
            };
        }
        data[0].cl = {//闭合曲线起始点和终点间曲线的控制点，在这两点中点与中心点连线上，偏向两点中点，使曲线看上去微微弯曲，偏向程度由k决定
            x : (data[0].p.x + data[n - 1].p.x) / 2 * (1 - k) + c.x * k,
            y : (data[0].p.y + data[n - 1].p.y) / 2 * (1 - k) + c.y * k
        }
        //绘制闭合曲线终点到起始点间的曲线
        var drawP: string = "M " + data[n - 1].p.x + "," + data[n - 1].p.y + " Q " + data[0].cl.x + " " + data[0].cl.y + " " + data[0].p.x + " " + data[0].p.y + ", ";
        for (var j = 1; j < n; j++) {
            data[j].cl = {//每个控制点的坐标
                x: (data[j].p.x + data[j - 1].p.x) / 2 * (1 - k) + c.x * k,
                y: (data[j].p.y + data[j - 1].p.y) / 2 * (1 - k) + c.y * k
            }
            drawP += data[j].cl.x + " " + data[j].cl.y + " " + data[j].p.x + " " + data[j].p.y + ", ";//绘制每条曲线
        }
        drawP += "Z";//曲线闭合，否则会留下缺口
        this.drawM = drawM;//将绘制数据赋给组件的property，函数只在初始化的时候运行一次
        this.drawP = drawP;
    };
}
