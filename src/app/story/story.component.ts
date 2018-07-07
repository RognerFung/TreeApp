import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { AudioDirective } from '../_directives/audio.directive';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

    @ViewChild('storyAudio') storyAudio: AudioDirective;

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
                console.log(this.stories);
                this.story = this.stories[0];
            }, 
            error => this.errorMessage = error
        );
    };

    dealEnd = function () {
        let i = this.stories.indexOf(this.story);
        if (i === this.stories.length) {
            this.story = this.stories[0];
        } else {
            this.story = this.stories[i + 1];
        }
        this.storyAudio.nativeElement.src = this.story.src;
        this.storyAudio.nativeElement.play();
        console.log(this.storyAudio.nativeElement);
    };

    playBack = function () {
        let i = this.stories.indexOf(this.story);
        if (i === 0) {
            this.story = this.stories[this.stories.length - 1];
        } else {
            this.story = this.stories[i - 1];
        }
        this.storyAudio.nativeElement.src = this.story.src;
        this.storyAudio.nativeElement.play();
        console.log(this.storyAudio.nativeElement);
    }

}
