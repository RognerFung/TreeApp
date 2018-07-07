import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAudio]'
})
export class AudioDirective {

    private audioPlayer: HTMLAudioElement;
    constructor(element: ElementRef) {
        this.audioPlayer = element.nativeElement;
    }

    stop () {
        this.audioPlayer.pause();
    }

    start () {
        this.audioPlayer.play();
    }

    get_currentTime () : number {
        return this.audioPlayer.currentTime;
    }

    get_duration () : number {
        return this.audioPlayer.duration;
    }

    get_playbackComplete () {
        return this.audioPlayer.duration == this.audioPlayer.currentTime;
    }
}
