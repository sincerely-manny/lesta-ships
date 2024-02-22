'use client';

import { ApolloSandbox } from '@apollo/sandbox/react';

export default function EmbeddedSandbox() {
    return <ApolloSandbox initialEndpoint="https://vortex.korabli.su/api/graphql/glossary/" className="h-screen" />;
}
