export const validateLoginForm = (email?: string, password?: string) => {
  const errors = { email: "", password: "" };

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

export const validateProductForm = (product: Product): string | null => {
  if (!product.name.trim()) {
    return "Product name is required";
  }
  if (product.available < 0) {
    return "Available must be a non-negative number";
  }
  if (product.sold < 0) {
    return "Sold must be a non-negative number";
  }
  if (product.colorIds.length === 0) {
    return "At least one color must be selected";
  }
  if (product.price < 0) {
    return "Price must be a non-negative number";
  }
  return null;
};

export const validateString = function (label: string, length: number) {
  return function (str: string) {
    if (!str.trim()) {
      return `${label} name is required`;
    }
    if (str.length > length) {
      return `${label} name must be less than ${length} characters`;
    }
  };
};