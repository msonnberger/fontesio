import type { z } from 'zod';
import type { csl_json_schema } from './csl-json-schema';

export type CslJsonResource = z.infer<CslJsonSchema>;

export type CslJsonSchema = typeof csl_json_schema;
