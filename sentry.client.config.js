import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,

  beforeSend(event) {
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }

    return event;
  },
});
