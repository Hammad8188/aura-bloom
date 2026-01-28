import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
};

const ADMIN_EMAIL = "admin@noiressence.com";
const ADMIN_PASSWORD = "Admin123!";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminToken = req.headers.get('x-admin-token');
    
    // Validate admin token exists (simple validation - token was issued by admin-auth)
    if (!adminToken) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - No admin token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    const body = await req.json().catch(() => ({}));

    switch (action) {
      case 'list': {
        const { data, error } = await supabase
          .from('products')
          .select(`*, product_sizes (*)`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify(data), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      case 'get': {
        const { id } = body;
        const { data, error } = await supabase
          .from('products')
          .select(`*, product_sizes (*)`)
          .eq('id', id)
          .single();

        if (error) throw error;
        return new Response(JSON.stringify(data), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      case 'create': {
        const { product, sizes } = body;
        
        const { data: productData, error: productError } = await supabase
          .from('products')
          .insert(product)
          .select()
          .single();

        if (productError) throw productError;

        if (sizes && sizes.length > 0) {
          const sizesWithProductId = sizes.map((size: any) => ({
            ...size,
            product_id: productData.id,
          }));

          const { error: sizesError } = await supabase
            .from('product_sizes')
            .insert(sizesWithProductId);

          if (sizesError) throw sizesError;
        }

        return new Response(JSON.stringify(productData), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      case 'update': {
        const { id, product, sizes } = body;
        
        const { error: productError } = await supabase
          .from('products')
          .update(product)
          .eq('id', id);

        if (productError) throw productError;

        // Delete existing sizes and insert new ones
        await supabase.from('product_sizes').delete().eq('product_id', id);

        if (sizes && sizes.length > 0) {
          const sizesWithProductId = sizes.map((size: any) => ({
            ...size,
            product_id: id,
          }));

          const { error: sizesError } = await supabase
            .from('product_sizes')
            .insert(sizesWithProductId);

          if (sizesError) throw sizesError;
        }

        return new Response(JSON.stringify({ success: true, id }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      case 'delete': {
        const { id } = body;
        
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      case 'update-stock': {
        const { sizeId, stock } = body;
        
        const { error } = await supabase
          .from('product_sizes')
          .update({ stock })
          .eq('id', sizeId);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error: any) {
    console.error('Admin products error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
