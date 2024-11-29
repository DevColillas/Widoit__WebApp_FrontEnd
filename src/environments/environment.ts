// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageInfo from '../../package.json'

export const environment = {
  production: false,
  version: packageInfo.version,

  // GET_SHIPMENT_DATA_URL: 'https://run.mocky.io/v3/6bc13e3c-6d74-4617-9551-26900c4f46d9',
  GET_SHIPMENT_DATA_URL: '/assets/dummy/shipments_60_records.json',

}
