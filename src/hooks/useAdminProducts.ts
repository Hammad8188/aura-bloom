import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductSize = Database['public']['Tables']['product_sizes']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductSizeInsert = Database['public']['Tables']['product_sizes']['Insert'];

export interface ProductWithSizes extends Product {
  product_sizes: ProductSize[];
}

const ADMIN_SESSION_KEY = 'noir_admin_session';

const getAdminToken = () => sessionStorage.getItem(ADMIN_SESSION_KEY);

const adminProductsApi = async (action: string, body: any = {}) => {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated as admin');

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-products?action=${action}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        'x-admin-token': token,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Request failed');
  }

  return response.json();
};

export const useAdminProducts = () => {
  return useQuery({
    queryKey: ['admin-products'],
    queryFn: () => adminProductsApi('list'),
  });
};

export const useAdminProduct = (id: string) => {
  return useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => adminProductsApi('get', { id }),
    enabled: !!id,
  });
};

export const useCreateAdminProduct = () => {
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
      return adminProductsApi('create', { product, sizes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error creating product', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdateAdminProduct = () => {
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
      return adminProductsApi('update', { id, product, sizes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating product', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeleteAdminProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      return adminProductsApi('delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdateAdminStock = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ sizeId, stock }: { sizeId: string; stock: number }) => {
      return adminProductsApi('update-stock', { sizeId, stock });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Stock updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating stock', description: error.message, variant: 'destructive' });
    },
  });
};
