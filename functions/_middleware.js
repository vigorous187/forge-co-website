const CANONICAL_HOST = "forge-co.ca";

// Retain the legacy redirect as reference without registering a Pages handler.
// Verified production is static-only; a root onRequest export would activate
// Functions on every route during an otherwise static SEO release.
export async function legacyCanonicalRedirect(context) {
  const url = new URL(context.request.url);

  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
