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
  bannerText: string[];
  businessHours: Record<string, { open: string; close: string }>;
  about: string;
  aboutImage?: string;
}

export const defaultHomePageData: HomePageData = {
  companyName: '',
  slogan: '',
  phone: '',
  location: { street: '', city: '', state: '', zip: '' },
  CTA: '',
  logoUrl: '',
  about: '',
  bannerImages: [],
  bannerText: ['Test Text'],
  businessHours: {},
};
