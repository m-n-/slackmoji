import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostToSlackService } from './postToSlack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public backgroundHidden = false;
  public downloaded = false;
  public redirectUri: string;
  public clientId: string;

  constructor(public activatedRoute: ActivatedRoute,
              public postToSlackService: PostToSlackService) {}

  ngOnInit() {
    this.redirectUri = this.postToSlackService.getRedirectURI();
    this.clientId = this.postToSlackService.getClientId();

    setTimeout(() => {
      this.backgroundHidden = true;
    }, 5000);

    setTimeout(() => {
      this.backgroundHidden = false;
    }, 79000);

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        this.downloaded = true;
        const code = params.code;

        this.postToSlackService.requestToken(code).subscribe(
          (res) => {
            this.postToSlackService.postToSlack(res.access_token).subscribe(
              (res2) => {
                window.open('http://salanki.com/slakmoji/SlakMoji.zip', '_blank');
              }
            );
          }
        );
      }
    });
  }
}


