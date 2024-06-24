const { ConsoleSpanExporter, SimpleSpanProcessor } = require( '@opentelemetry/sdk-trace-base');
const { WebTracerProvider } = require( '@opentelemetry/sdk-trace-web');
const { XMLHttpRequestInstrumentation } = require( '@opentelemetry/instrumentation-xml-http-request');
const { ZoneContextManager } = require( '@opentelemetry/context-zone');
const { OTLPTraceExporter } = require( '@opentelemetry/exporter-trace-otlp-http');
const { B3Propagator } = require( '@opentelemetry/propagator-b3');
const { registerInstrumentations } = require( '@opentelemetry/instrumentation');
const { Resource } = require('@opentelemetry/resources');
const { SEMRESATTRS_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

let WEB_TRACER_WITH_ZONE: any;
export function getWebTracerWithZone () {
  if (WEB_TRACER_WITH_ZONE) {
    return WEB_TRACER_WITH_ZONE;
  }
  const providerWithZone = new WebTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'create-aelf-dapp'
    })
  });

// Note: For production consider using the "BatchSpanProcessor" to reduce the number of requests
// to your exporter. Using the SimpleSpanProcessor here as it sends the spans immediately to the
// exporter without delay
  providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({
    // url: 'http://localhost:4318/v1/traces',
    url: 'http://localhost:8092/v1/traces',
  })));

  providerWithZone.register({
    contextManager: new ZoneContextManager(),
    propagator: new B3Propagator(),
    // propagator: new SentryPropagator(),
    // contextManager: new SentryContextManager(),
  });

  registerInstrumentations({
    instrumentations: [
      new XMLHttpRequestInstrumentation({
        ignoreUrls: [/localhost:8092\/sockjs-node/],
        propagateTraceHeaderCorsUrls: [
          'https://httpbin.org/get',
        ],
      }),
    ],
  });

  const webTracerWithZone = providerWithZone.getTracer('example-tracer-web');
  window.webTracerWithZone = webTracerWithZone;
  WEB_TRACER_WITH_ZONE = webTracerWithZone;
  console.log('webTracerWithZone: ', webTracerWithZone);
  return webTracerWithZone;
}
