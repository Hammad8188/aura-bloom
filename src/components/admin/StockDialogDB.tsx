import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { ProductWithSizes, useUpdateAdminStock } from '@/hooks/useAdminProducts';
import { Minus, Plus } from 'lucide-react';

interface StockDialogDBProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductWithSizes | null;
}

const StockDialogDB = ({ open, onOpenChange, product }: StockDialogDBProps) => {
  const updateStock = useUpdateAdminStock();
  const [sizes, setSizes] = useState<{ id: string; size: string; stock: number }[]>([]);

  useEffect(() => {
    if (product) {
      setSizes(
        product.product_sizes.map(s => ({
          id: s.id,
          size: s.size,
          stock: s.stock,
        }))
      );
    }
  }, [product, open]);

  const handleStockChange = (index: number, newStock: number) => {
    const newSizes = [...sizes];
    newSizes[index].stock = Math.max(0, newStock);
    setSizes(newSizes);
  };

  const handleSave = () => {
    sizes.forEach(size => {
      const original = product?.product_sizes.find(s => s.id === size.id);
      if (original && original.stock !== size.stock) {
        updateStock.mutate({ sizeId: size.id, stock: size.stock });
      }
    });
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Manage Stock - {product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {sizes.map((size, index) => (
            <div key={size.id} className="flex items-center justify-between">
              <Label className="text-base font-medium">{size.size}</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleStockChange(index, size.stock - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={size.stock}
                  onChange={(e) => handleStockChange(index, parseInt(e.target.value) || 0)}
                  className="w-20 text-center"
                  min={0}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleStockChange(index, size.stock + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="gold-gradient text-primary-foreground" 
            onClick={handleSave}
            disabled={updateStock.isPending}
          >
            {updateStock.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockDialogDB;
