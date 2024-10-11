export const validateLoginForm = (email?: string, password?: string) => {
  const errors = {email: '', password: ''};

  if (!email) {
    errors.email = "Email is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return errors;
};

interface Product {
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

export const validateProductForm = (formData: Product): string | null => {
  if (!formData.name.trim()) {
    return "Product name is required";
  }
  if (formData.available < 0) {
    return "Available quantity cannot be negative";
  }
  if (formData.price <= 0) {
    return "Price must be greater than zero";
  }
  if (formData.categoryId === 0) {
    return "Please select a category";
  }
  if (formData.colorIds.length === 0) {
    return "Please select at least one color";
  }
  return null; 
};

export const validateCategory = (categoryName: string): string | null => {
  if (!categoryName.trim()) {
    return "Category name is required";
  }
  if (categoryName.length > 20) {
    return "Category name must be less than 20 characters";
  }
  return null;
};

export const validateColor = (colorName: string): string | null => {
  if (!colorName.trim()) {
    return "Category name is required";
  }
  if (colorName.length > 10) {
    return "Category name must be less than 10 characters";
  }
  return null;
};