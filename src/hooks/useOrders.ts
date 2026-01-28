import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { useEffect } from 'react';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderTimeline = Database['public']['Tables']['order_timeline']['Row'];
type Customer = Database['public']['Tables']['customers']['Row'];
type OrderStatus = Database['public']['Enums']['order_status'];

export interface OrderWithDetails extends Order {
  order_items: OrderItem[];
  order_timeline: OrderTimeline[];
  customers: Customer | null;
}

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          order_timeline (*),
          customers (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as OrderWithDetails[];
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          order_timeline (*),
          customers (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as OrderWithDetails;
    },
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ orderId, status, note }: { orderId: string; status: OrderStatus; note?: string }) => {
      // Update order status
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (orderError) throw orderError;

      // Add to timeline
      const { error: timelineError } = await supabase
        .from('order_timeline')
        .insert({
          order_id: orderId,
          status,
          note: note || `Status updated to ${status}`,
        });

      if (timelineError) throw timelineError;

      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: 'Order status updated' });
    },
    onError: (error) => {
      toast({ title: 'Error updating order', description: error.message, variant: 'destructive' });
    },
  });
};
