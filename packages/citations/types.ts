import type { z } from 'zod';
import type { csl_json_schema, csl_name_fields, csl_types } from './csl-json-schema';

export type CslJsonReference = z.infer<CslJsonSchema>;

export type CslJsonSchema = typeof csl_json_schema;

export type CslType = (typeof csl_types)[number];

export type CslNameField = (typeof csl_name_fields)[number];
