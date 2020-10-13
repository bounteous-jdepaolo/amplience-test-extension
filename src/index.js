import { init } from 'dc-extensions-sdk';

import React from 'react';
import { render } from 'react-dom';
import App from './app';

const debug = process.env.NODE_ENV !== 'production';
const errorText = 'Failed to initialize the HTML Static Landing Page Extension';

// Run
(async function buildStaticLandingPageUI() {

  try {
    const sdk = await init({debug});
    const {
      prefix = 'https://c1.adis.ws/v1/content/gaptest/content-item/',
      template = 'acc-template-static-landing-page',
      locale = ',en-*,*'
    } = sdk.params.instance;

    render(
      <App
        sdk={sdk}
      />,
      document.getElementById('staticLandingPageApp')
    );
  } catch (e) {
    console.error(e);
    render(<div>{errorText}</div>);
  }
})()
