const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e: any) => e.message).join(', '));
  return json.data;
}

export async function createCart(lineItems: { merchandiseId: string; quantity: number }[]) {
  return shopifyFetch<any>(`mutation cartCreate($input: CartInput!) { cartCreate(input: $input) { cart { id checkoutUrl } } }`, { input: { lines: lineItems } });
}
