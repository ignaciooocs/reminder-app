import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {}

const envsSchema = joi.object({})
.unknown();

const {error, value} = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {}