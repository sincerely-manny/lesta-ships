import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

// @ts-ignore
loadEnvConfig(process.cwd());

console.log('GQL_API_URL', process.env.GQL_API_URL);

const config: CodegenConfig = {
    schema: process.env.GQL_API_URL,
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/lib/gql/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
