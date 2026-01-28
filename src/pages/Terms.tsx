import Layout from '@/components/layout/Layout';

const Terms = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="font-serif text-3xl mb-8">Terms & Conditions</h1>
      <div className="prose prose-neutral max-w-none text-muted-foreground space-y-4">
        <p>Welcome to NOIR ESSENCE. By using our website and services, you agree to these terms.</p>
        <h2 className="font-serif text-xl mt-6 mb-3 text-foreground">Orders & Payment</h2>
        <p>All orders are subject to availability. We reserve the right to refuse or cancel orders at our discretion.</p>
        <h2 className="font-serif text-xl mt-6 mb-3 text-foreground">Product Information</h2>
        <p>We strive to display accurate product information but cannot guarantee all details are error-free.</p>
        <h2 className="font-serif text-xl mt-6 mb-3 text-foreground">Intellectual Property</h2>
        <p>All content on this website is the property of NOIR ESSENCE and protected by copyright laws.</p>
      </div>
    </div>
  </Layout>
);

export default Terms;
