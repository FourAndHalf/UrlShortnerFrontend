
export interface CreateShortUrl {
  OriginalUrl: string,
  ShortenUrl: string,
  DaysToExpiry: number,
  User: string
  UserType: string
}
