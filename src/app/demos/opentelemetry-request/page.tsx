'use client'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { W3CTraceContextPropagator } from '@opentelemetry/core';

import { Button } from 'aelf-design';
import {FetchInstrumentation} from '@opentelemetry/instrumentation-fetch';

const provider = new WebTracerProvider();

provider.register({
  propagator: new W3CTraceContextPropagator(),
});

registerInstrumentations({
  instrumentations: [
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: /.*/,
    }),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: /.*/,
    }),
  ],
});

const getData = (url: string) => new Promise((resolve, reject) => {
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('Accept', 'application/json');
  // req.setRequestHeader('TraceId', 'trace-556688991');
  req.onload = () => {
    resolve(null);
  };
  req.onerror = () => {
    reject();
  };
  req.send();
});
// const URL_TEST = 'https://httpbin.org/get?trace=233333';
const URL_TEST = 'http://localhost:8093/sharp/api/app/book';
export default function Page() {
  return <>
   <Button onClick={() => {
     getData(URL_TEST).then((_data) => {}, () => {});
   }}>Request</Button>
    <Button onClick={async () => {

      const res = await fetch("/api/demos/sentry-example-api");
      if (!res.ok) {
        throw new Error("Sentry Example Frontend Error");
      }
    }}>Request Failed</Button>
  </>
}
