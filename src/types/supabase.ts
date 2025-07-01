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
