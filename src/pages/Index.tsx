import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import ProductShowcase from '@/components/home/ProductShowcase';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCollections />
      <ProductShowcase />
      <BrandStory />
      <Testimonials />
      <InstagramGallery />
    </Layout>
  );
};

export default Index;
