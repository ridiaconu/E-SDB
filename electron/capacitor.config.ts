import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'e.sdb',
  appName: 'e-sdb',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
