declare module 'fastify-fingerprint' {
  export function hash(headers: IncomingHttpHeaders): string;
}
