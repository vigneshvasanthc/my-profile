import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ImgDirectoryService } from '../service/img-directory.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  myLinkedInIcon = faLinkedin;
  myGithubIcon = faGithub;
  faDownArrow = faArrowDown;
  isAtBottom = false;

   @ViewChildren('scrollSection') sections!: QueryList<ElementRef>;

  profilePic: any;

  skillPic: any;

  constructor(private imgService: ImgDirectoryService){};

  pageLoading = true;

  ngOnInit(): void {
    this.profilePic = this.imgService.myImg;
    this.skillPic = this.imgService.skillImg;
    setTimeout(() => {
      this.pageLoading = false;
    }, 3000);
  }


  // Detect scroll bottom
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight;

    this.isAtBottom = scrollTop + windowHeight >= docHeight - 5;
  }

  onScrollButtonClick(): void {
    const sectionElements = this.sections.toArray();

    // Scroll to top if at bottom
    if (this.isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Find next section based on current scroll position
    const currentScroll = window.scrollY + 10;

    const nextSection = sectionElements.find(
      section =>
        section.nativeElement.offsetTop > currentScroll
    );

    if (nextSection) {
      nextSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
