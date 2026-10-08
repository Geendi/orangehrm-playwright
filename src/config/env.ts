/**
 * Central place for environment-driven values.
 * Defaults are the public demo credentials shown on the OrangeHRM login page.
 */
export const env = {
  adminUsername: process.env.ADMIN_USERNAME ?? 'Admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
};
