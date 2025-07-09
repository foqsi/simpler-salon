export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          role: string;
          business_id: string;
        };
      };
      business: {
        Row: {
          id: string;
          name: string;
          slogan: string;
          banner_texts: string;
          logo_url: string;
          banner_images: string[];
          about: string;
          phone: string;
          location: string;
          business_hours: string;
          tier: string;
          pending_tier: string;
          slug: string;
          subdomain: string | null;
          custom_domain: string | null;
          domain_type: 'route' | 'subdomain' | 'custom';
        };
        Update: {
          name?: string;
          slogan?: string;
          banner_texts?: string;
          logo_url?: string;
          banner_images?: string[];
          about?: string;
          phone?: string;
          location?: string;
          business_hours?: string;
        };
      };
    };
  };
};
