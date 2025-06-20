export const baseConfig = {
    timeout: 30000,
    retries: 2,
    headless: process.env.HEADLESS === 'true',
    viewport: {
        width: 1280,
        height: 720
    },
    timeouts: {
        defaultTimeout: 5000,
        defaultWaitTime: 1000
    },
    browsers: {
        chromium: true,
        firefox: true,
        webkit: true,
        edge: true
    }
}; 