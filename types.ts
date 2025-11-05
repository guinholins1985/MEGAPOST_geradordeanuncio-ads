
export interface FormState {
  productName: string;
  productDescription: string;
  targetAudience: string;
  tone: string;
}

export interface GoogleAdsCopy {
  headlines: string[];
  descriptions: string[];
}

export interface MetaAdsCopy {
  primaryTexts: string[];
  headlines: string[];
}

export interface AdCopy {
  googleAds: GoogleAdsCopy;
  metaAds: MetaAdsCopy;
}
