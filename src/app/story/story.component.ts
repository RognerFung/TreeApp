import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { AudioDirective } from '../_directives/audio.directive';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

    @ViewChild('myaudio') myAudio: AudioDirective;

    story: any;
    stories: any;
    allEnd: boolean = false;
    audio: any;

    constructor(
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.loadAllStories();
    }

    loadAllStories = function () {
        this.commonService.modifyStory(
            {
                order: "select",
                data: {}
            }).subscribe(
            data => {
                this.stories = data;
                this.stories.forEach(story => {
                    story.src = "assets/stories/" + story.book + "/" + story.name + ".mp3";
                });
                this.story = this.stories[0];
            }, 
            error => this.errorMessage = error
        );
    };

    dealEnd = function () {
        let i = this.stories.indexOf(this.story);
        if (i === this.stories.length) {
            this.story = undefined;
            this.allEnd = true;
        } else {
            this.story = this.stories[i + 1];
        }
        this.myAudio.nativeElement.src=this.story.src;
        this.myAudio.nativeElement.play();
    };

}
