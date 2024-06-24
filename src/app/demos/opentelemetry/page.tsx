'use client'
import {useEffect} from 'react';

const { context, trace } = require('@opentelemetry/api');
import { Button } from 'aelf-design';
import { getWebTracerWithZone } from './opentelemetry';

const getData = (url: string) => new Promise((resolve, reject) => {
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('Accept', 'application/json');
  req.setRequestHeader('TraceId', 'trace-556688991');
  req.onload = () => {
    resolve(null);
  };
  req.onerror = () => {
    reject();
  };
  req.send();
});
const URL_TEST = 'https://httpbin.org/get?trace=233333';
export default function Page() {

  useEffect(() => {
    getWebTracerWithZone();
    console.log('getWebTracerWithZone done');
  }, []);

  return <>
   <Button onClick={() => {
     getData(URL_TEST).then((_data) => {
       // trace.getSpan(context.active()).addEvent('fetching-span1-completed');
       // span1.end();
     }, () => {
       // trace.getSpan(context.active()).addEvent('fetching-error');
       // span1.end();
     });
   }}>Test</Button>
    <Button onClick={() => {
      const webTracerWithZone = getWebTracerWithZone();
      for (let i = 0, j = 5; i < j; i += 1) {
        const span1 = webTracerWithZone.startSpan(`cad-files-series-info-${i}`);
        context.with(trace.setSpan(context.active(), span1), () => {
          getData(URL_TEST).then((_data) => {
            trace.getSpan(context.active()).addEvent('cad-fetching-span1-completed');
            span1.end();
          }, () => {
            trace.getSpan(context.active()).addEvent('cad-fetching-error');
            span1.end();
          });
        });
      }
    }}>Test With Event</Button>
  </>
}
