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
    sortStories: any = [];
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
                    let i = this.stories.indexOf(story);
                    if (i % 4 === 3) {
                        this.sortStories.push(
                            {
                                "name": story.book,
                                "stories": [this.stories[i - 3], this.stories[i - 2], this.stories[i - 1], this.stories[i]],
                            }
                        );
                    }
                });
                console.log(this.stories);
                console.log(this.sortStories);
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

    chooseStory = function (story) {
        this.story = story;
        this.storyAudio.nativeElement.src = this.story.src;
        this.storyAudio.nativeElement.play();
        console.log(this.storyAudio.nativeElement);
    }

    btnColor = function (set) {
        switch(set) {
            case(1): return "btn-outline-primary";
            case(2): return "btn-outline-danger";
            case(3): return "btn-outline-success";
            case(4): return "btn-outline-warning";
        }
    }

}
