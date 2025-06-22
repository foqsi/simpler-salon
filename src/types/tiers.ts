export enum TierLevel {
  Admin = -1,
  Free = 0,
  Starter = 1,
  Essentials = 2,
  Ultimate = 3,
  Appointments = 4,
  Custom = 5,
}

export const tierPermissions = {
  [TierLevel.Admin]: ['admin_access'],
  [TierLevel.Free]: ['view_site', 'egift_cards', 'home_page'],
  [TierLevel.Starter]: ['view_site', 'egift_cards', 'home_page', 'services_page'],
  [TierLevel.Essentials]: ['view_site', 'egift_cards', 'home_page', 'services_page', 'gallery_page'],
  [TierLevel.Appointments]: ['view_site', 'egift_cards', 'home_page', 'services_page', 'gallery_page', 'appointments'],
  [TierLevel.Ultimate]: ['view_site', 'egift_cards', 'home_page', 'services_page', 'gallery_page', 'appointments', 'advanced_customization'],
  [TierLevel.Custom]: ['view_site', 'egift_cards', 'home_page', 'services_page', 'gallery_page', 'appointments', 'advanced_customization',],
};
