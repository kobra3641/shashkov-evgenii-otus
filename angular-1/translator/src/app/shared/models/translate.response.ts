interface Fragment {
  translatedText: string,
}

export class TranslateResponse {
  constructor(
    public responseData?: Fragment,
    public text?: string,
    public langPair?: string
  ) {
  }
}
