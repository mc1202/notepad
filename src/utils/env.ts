
import pkg from '../../package.json';

/**
 * @description: Generate cache key according to version
 */
export function getPkgVersion() {
  return `${`__${pkg.version}`}__`.toUpperCase();
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: 获取当前运行模式 test、production、development
 * @returns:
 * @example:
 */
export function getEnvMode(): string {
  return 'development';
}

/**
 * @description: 获取环境变量
 * @returns:
 * @example:
 */
export function getEnvValue<T = any>(key: string): T {
  // @ts-ignore
  return import.meta.env[key];
}

// /**
//  * @description: Is it a development mode
//  * @returns:
//  * @example:
//  */
// export function isDevMode(): boolean {
//   return getEnvValue<boolean>('VITE_DEV');
// }

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
// export function isProdMode(): boolean {
//   return getEnvValue<boolean>('VITE_PROD');
// }

/**
 * @description: Get environment VITE_BASE_URL value
 * @returns:
 * @example:
 */
export function getBaseUrl(): string {
  return getEnvValue<string>('VITE_BASE_URL');
}

/**
 * @description: Get environment VITE_UPLOAD_URL value
 * @returns:
 * @example:
 */
export function getUploadUrl(): string {
  return getEnvValue<string>('VITE_UPLOAD_URL');
}
