import { Request } from 'express';
import { Meta } from '@navikt/familie-logging';

export const genererMetadata = (req: Request): Meta => {
  const callId = req.header('nav-call-id');
  // eslint-disable-next-line @typescript-eslint/camelcase
  return callId ? { x_callId: callId } : {};
};
