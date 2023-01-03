import { Request } from 'express';
import { Meta } from '@navikt/familie-logging';

export const genererMetadata = (req: Request): Meta => {
  const callId = req.header('nav-call-id');
  return callId ? { x_callId: callId } : {};
};
