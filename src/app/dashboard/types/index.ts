export interface Metrics {
  appointmentsToday: number;
  appointmentsThisMonth: number;
  canceledAppointments: number;
  newClients: number;
  giftCardsSoldToday: number;
  giftCardsSoldThisMonth: number;
  giftCardRevenue: number;
  redeemedGiftCards: number;
  estimatedRevenue: number;
  averageAppointmentValue: number;
  profileCompletion: number;
  homepageComplete: boolean;
  egiftEnabled: boolean;
  unpublishedUpdates: number;
  unrepliedContacts: number;
  tier: string;
}

export interface HomePageData {
  companyName: string;
  slogan: string;
  bannerText: string;
  logoUrl: string;
  bannerImages: string[];
  about: string;
  phone: string;
  location: string;
  businessHours: string;
  CTA: string;
}