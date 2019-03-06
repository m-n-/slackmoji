import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PostToSlackService {
  constructor(private http: HttpClient) { }

  // Configuration options
  public CLIENT_ID = 'YOUR SLACK CLIENT ID';
  // public CLIENT_ID = '2163431414.562537648576';
  public CLIENT_SECRET = 'YOUR SLACK CLIENT SECRET';
  // public CLIENT_SECRET = '636d2fa0286108987eesssa5dbe28932';
  public CHANNEL = 'CHANNEL YOU WANT TO POST TO';
  // public CHANNEL = 'general';
  public REDIRECT_URI = 'URL YOU ARE REDIRECTING TO / WHERE THE SITE IS LIVING';
  // public REDIRECT_URI = 'http://mpn.xyz';
  public TEXT_TO_POST = 'Hellooooo EVERYONENE!!!'

  public getClientId() {
    return this.CLIENT_ID;
  }

  public getRedirectURI() {
    return this.REDIRECT_URI;
  }

  public postToSlack(tokenString: string): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type':  'application/x-www-form-urlencoded'
      }
    };

    return this.http.request<any>(
      'POST',
      'https://slack.com/api/chat.postMessage?token=' + tokenString + '&channel=' + this.CHANNEL + '&text=' + this.TEXT_TO_POST,
      httpOptions);
  }

  public requestToken(code: string): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type':  'application/x-www-form-urlencoded'
      }
    };

    return this.http.request<any>(
      'POST',
      'https://slack.com/api/oauth.access?client_id=' + this.CLIENT_ID + '&client_secret=' + this.CLIENT_SECRET + '&code=' + code + '&redirect_uri=' + this.REDIRECT_URI,
      httpOptions);
  }
}
