import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { shortUrlService } from '../../api/shorturl.service';
import { ApiResponse } from '../../api/models/helpers.model';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})

export class RedirectComponent implements OnInit {
  constructor (private route: ActivatedRoute, private router: Router, private http: HttpClient, private shortUrlService pShortUrlService) {}

  ngOnInit(): void {
    const pShortCode = this.route.snapshot.paramMap.get('shortcode');

    if (pShortCode) {
      this.pShortUrlService.getOriginalUrlByShortCode(pShortCode)
        .subscribe({
          next: (response: ApiResponse<string>) => {
            if (response.success && response.data) {
              window.location.href = response.data;
            } else {
              console.error('Api Error', response.message);
              // Implement error message
              this.router.navigateByUrl('/');
            }
          },
          error: (err) => {
            console.error('Api Error', response.message);
            // Implement error message
            this.router.navigateByUrl('/');
          }
        })
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
