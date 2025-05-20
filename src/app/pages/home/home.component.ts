import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { shortUrlService } from '../../api/shorturl.service';
import { createShortUrl } from '../../api/models/createShortUrl.model';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  txtOriginalUrl: string = '';

  constructor(private pShortUrlService: shortUrlService) {}

  submitOriginalUrl() {
    const createShortUrlDto: createShortUrl = {
      originalUrl: this.txtOriginalUrl,
      daysToExpiry: 7,
      shortenUrl: '',
      user: '',
      userType: ''
    };

    this.pShortUrlService.createShortCode(createShortUrlDto).subscribe(
      (res) => console.log("Post Success:", res),
      (err) => console.error("Post Error:", err)
    )
  }
}

