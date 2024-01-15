import type { z } from 'zod';
import type { csl_json_schema, csl_types } from './csl-json-schema';

export type CslJsonResource = z.infer<CslJsonSchema>;

export type CslJsonSchema = typeof csl_json_schema;

export type CslType = (typeof csl_types)[number];
