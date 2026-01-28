import Layout from '@/components/layout/Layout';

const Shipping = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="font-serif text-3xl mb-8">Shipping & Returns</h1>
      <div className="prose prose-neutral max-w-none">
        <h2 className="font-serif text-xl mt-6 mb-3">Shipping</h2>
        <p className="text-muted-foreground mb-4">Standard shipping (5-7 days): $10 or FREE on orders over $150. Express shipping (2-3 days): $25.</p>
        <h2 className="font-serif text-xl mt-6 mb-3">Returns</h2>
        <p className="text-muted-foreground mb-4">We accept returns within 30 days for unopened products. Contact us at hello@noiressence.com to initiate a return.</p>
        <h2 className="font-serif text-xl mt-6 mb-3">Exchanges</h2>
        <p className="text-muted-foreground">We're happy to exchange your purchase for a different size or fragrance within 30 days.</p>
      </div>
    </div>
  </Layout>
);

export default Shipping;
