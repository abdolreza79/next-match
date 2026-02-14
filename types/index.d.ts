import { error } from 'console';
import { ZodError } from 'zod';

export type ActionResult<T> =
  | {
      data: T;
      status: 'success';
    }
  | { status: 'error'; error: string | ZodIssue[] };
