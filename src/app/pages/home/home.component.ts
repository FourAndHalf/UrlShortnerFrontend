import { Component } from '@angular/core';
import { shortUrlService } from '../../api/shorturl.service';
import { createShortUrl } from '../../api/models/createShortUrl.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  createShortUrlDto: createShortUrl = {
    originalUrl: '',
    daysToExpiry: 7,
  };
}


createShortUrl() {

}
