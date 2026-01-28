import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, FragranceFamily, Gender } from '@/types';
import { Plus, Trash2, Upload, X } from 'lucide-react';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
}

const ProductDialog = ({ open, onOpenChange, product, onSave }: ProductDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    fragranceFamily: 'oriental' as FragranceFamily,
    gender: 'unisex' as Gender,
    sizes: [{ size: '30ml', price: 0, stock: 0 }],
    image: '',
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
        image: product.images[0] || '',
      });
      setImagePreview(product.images[0] || null);
    } else {
      setFormData({
        name: '',
        shortDescription: '',
        description: '',
        fragranceFamily: 'oriental' as FragranceFamily,
        gender: 'unisex' as Gender,
        sizes: [{ size: '30ml', price: 0, stock: 0 }],
        image: '',
      });
      setImagePreview(null);
    }
  }, [product, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = formData.image ? [formData.image] : (product?.images || []);
    onSave({
      ...formData,
      id: product?.id || Date.now().toString(),
      brand: 'NOIR ESSENCE',
      images,
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
          {/* Image Upload */}
          <div>
            <Label>Product Image</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">Upload Image</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

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
