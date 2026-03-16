import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mi.primera.aplicacion',
  appName: 'Riksiri',
  webDir: 'dist',
  server: {
    url: 'http://10.0.2.2:5174',
    cleartext: true
  }
};

export default config;