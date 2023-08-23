import { isLocalhost } from 'serviceWorkerRegistration';

const MOCKUP_PASSWORD = isLocalhost ? 'Test@123456' : '';

export { MOCKUP_PASSWORD };
