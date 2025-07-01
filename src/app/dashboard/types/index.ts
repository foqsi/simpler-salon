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

export type HomePageData = {
  companyName: string;
  slogan: string;
  phone: string;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  CTA: string;
  logoUrl: string;
  bannerImages: string[];
  about: string;
  bannerText: string;
  businessHours: string;
};