import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, FragranceFamily, Gender } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
}

const ProductDialog = ({ open, onOpenChange, product, onSave }: ProductDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    fragranceFamily: 'oriental' as FragranceFamily,
    gender: 'unisex' as Gender,
    sizes: [{ size: '30ml', price: 0, stock: 0 }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        fragranceFamily: product.fragranceFamily,
        gender: product.gender,
        sizes: product.sizes.map(s => ({ size: s.size, price: s.price, stock: s.stock })),
      });
    } else {
      setFormData({
        name: '',
        shortDescription: '',
        description: '',
        fragranceFamily: 'oriental' as FragranceFamily,
        gender: 'unisex' as Gender,
        sizes: [{ size: '30ml', price: 0, stock: 0 }],
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: product?.id || Date.now().toString(),
      brand: 'NOIR ESSENCE',
      images: product?.images || [],
      rating: product?.rating || 0,
      reviewCount: product?.reviewCount || 0,
      createdAt: product?.createdAt || new Date().toISOString().split('T')[0],
    });
    onOpenChange(false);
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: '50ml', price: 0, stock: 0 }],
    });
  };

  const removeSize = (index: number) => {
    if (formData.sizes.length > 1) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((_, i) => i !== index),
      });
    }
  };

  const updateSize = (index: number, field: string, value: string | number) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = { ...newSizes[index], [field]: field === 'size' ? value : Number(value) };
    setFormData({ ...formData, sizes: newSizes });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fragrance Family</Label>
              <Select
                value={formData.fragranceFamily}
                onValueChange={(value: FragranceFamily) => setFormData({ ...formData, fragranceFamily: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="oriental">Oriental</SelectItem>
                  <SelectItem value="floral">Floral</SelectItem>
                  <SelectItem value="woody">Woody</SelectItem>
                  <SelectItem value="fresh">Fresh</SelectItem>
                  <SelectItem value="citrus">Citrus</SelectItem>
                  <SelectItem value="oud">Oud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: Gender) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Sizes & Pricing</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSize}>
                <Plus className="h-4 w-4 mr-1" /> Add Size
              </Button>
            </div>
            <div className="space-y-2">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={size.size}
                    onValueChange={(value) => updateSize(index, 'size', value)}
                  >
                    <SelectTrigger className="w-24 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="30ml">30ml</SelectItem>
                      <SelectItem value="50ml">50ml</SelectItem>
                      <SelectItem value="100ml">100ml</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">$</span>
                    <Input
                      type="number"
                      value={size.price}
                      onChange={(e) => updateSize(index, 'price', e.target.value)}
                      className="w-24"
                      min={0}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <Input
                      type="number"
                      value={size.stock}
                      onChange={(e) => updateSize(index, 'stock', e.target.value)}
                      className="w-20"
                      min={0}
                    />
                  </div>
                  {formData.sizes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSize(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gold-gradient text-primary-foreground">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
