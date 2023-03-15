import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent{
  @Input() videoId: string ='';

  videoUrl: string = '';


  ngOnChanges(changes: SimpleChanges): void {
      this.videoUrl = 'https://www.youtube.com/embed/' + this.videoId;
      console.log(this.videoUrl);
    
  }
}
