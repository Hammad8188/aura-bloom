import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewStatus = Database['public']['Enums']['review_status'];

export interface ReviewWithProduct extends Review {
  products?: {
    name: string;
  } | null;
}

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          products (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ReviewWithProduct[];
    },
  });
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ReviewStatus }) => {
      const { error } = await supabase
        .from('reviews')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({ title: 'Review updated' });
    },
    onError: (error) => {
      toast({ title: 'Error updating review', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({ title: 'Review deleted' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting review', description: error.message, variant: 'destructive' });
    },
  });
};
