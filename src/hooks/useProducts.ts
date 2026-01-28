import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductSize = Database['public']['Tables']['product_sizes']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductSizeInsert = Database['public']['Tables']['product_sizes']['Insert'];

export interface ProductWithSizes extends Product {
  product_sizes: ProductSize[];
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_sizes (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProductWithSizes[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_sizes (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ProductWithSizes;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      product, 
      sizes 
    }: { 
      product: Omit<ProductInsert, 'id'>; 
      sizes: Omit<ProductSizeInsert, 'product_id'>[] 
    }) => {
      // Insert product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (productError) throw productError;

      // Insert sizes
      if (sizes.length > 0) {
        const sizesWithProductId = sizes.map(size => ({
          ...size,
          product_id: productData.id,
        }));

        const { error: sizesError } = await supabase
          .from('product_sizes')
          .insert(sizesWithProductId);

        if (sizesError) throw sizesError;
      }

      return productData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error creating product', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      id, 
      product, 
      sizes 
    }: { 
      id: string; 
      product: Partial<ProductInsert>; 
      sizes: Omit<ProductSizeInsert, 'product_id'>[] 
    }) => {
      // Update product
      const { error: productError } = await supabase
        .from('products')
        .update(product)
        .eq('id', id);

      if (productError) throw productError;

      // Delete existing sizes and insert new ones
      await supabase.from('product_sizes').delete().eq('product_id', id);

      if (sizes.length > 0) {
        const sizesWithProductId = sizes.map(size => ({
          ...size,
          product_id: id,
        }));

        const { error: sizesError } = await supabase
          .from('product_sizes')
          .insert(sizesWithProductId);

        if (sizesError) throw sizesError;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating product', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ sizeId, stock }: { sizeId: string; stock: number }) => {
      const { error } = await supabase
        .from('product_sizes')
        .update({ stock })
        .eq('id', sizeId);

      if (error) throw error;
      return sizeId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Stock updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating stock', description: error.message, variant: 'destructive' });
    },
  });
};
