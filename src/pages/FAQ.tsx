import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for unopened products in their original packaging.' },
  { q: 'Are your fragrances authentic?', a: 'Yes, all NOIR ESSENCE fragrances are 100% authentic and crafted by our master perfumers.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes, we offer complimentary luxury gift wrapping on all orders.' },
  { q: 'How should I store my perfume?', a: 'Store in a cool, dry place away from direct sunlight to preserve the fragrance.' },
];

const FAQ = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-8 text-center">Frequently Asked Questions</h1>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </Layout>
);

export default FAQ;
