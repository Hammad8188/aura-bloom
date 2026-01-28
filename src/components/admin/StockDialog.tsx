import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types';
import { Plus, Minus } from 'lucide-react';

interface StockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (productId: string, sizes: { size: string; stock: number }[]) => void;
}

const StockDialog = ({ open, onOpenChange, product, onSave }: StockDialogProps) => {
  const [stockData, setStockData] = useState<{ size: string; stock: number; price: number }[]>([]);

  useEffect(() => {
    if (product) {
      setStockData(product.sizes.map(s => ({ size: s.size, stock: s.stock, price: s.price })));
    }
  }, [product, open]);

  const updateStock = (index: number, newStock: number) => {
    const updated = [...stockData];
    updated[index] = { ...updated[index], stock: Math.max(0, newStock) };
    setStockData(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSave(product.id, stockData);
      onOpenChange(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            Manage Stock - {product.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {stockData.map((item, index) => (
              <div key={item.size} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{item.size}</p>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateStock(index, item.stock - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.stock}
                    onChange={(e) => updateStock(index, Number(e.target.value))}
                    className="w-20 text-center"
                    min={0}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateStock(index, item.stock + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gold-gradient text-primary-foreground">
              Update Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StockDialog;
