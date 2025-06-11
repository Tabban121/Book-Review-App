// src/repositories/session.repository.ts
import { Session } from '../models/session.model';

export const SessionRepository = {
  findByToken: (token: string) => Session.findOne({ token }),
  create: (token: string, userId: string) => Session.create({ token, userId }),
  delete: (token: string) => Session.deleteOne({ token }),
};
