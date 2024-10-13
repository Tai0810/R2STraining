import React, { useCallback } from "react";
import ProductRow from "./ProductRow";

const ProductList: React.FC<any> = ({
  products,
  productIds,
  categories,
  currentPage,
  itemsPerPage,
  colors,
  onEdit,
  onDelete,
}) => {
  const getCategoryNameById = useCallback(
    (id: string) => {
      const category = categories[id];
      return category ? category.name : "Unknown";
    },
    [categories]
  );

  const getColorNamesById = useCallback(
    (colorIds: number[] = []) => {
      if (colorIds.length === 0) {
        return "No colors available";
      } else if (colorIds.length === 1) {
        const colorName = colors[colorIds[0]]?.name;
        return colorName ? colorName : "Unknown color";
      } else {
        return colorIds
          .map((colorId) => colors[colorId]?.name || "Unknown")
          .join(", ");
      }
    },
    [colors]
  );

  return (
    <>
      {productIds.map((id: number, index: number) => {
        const product = products[id];
        const category = getCategoryNameById(product.categoryId);
        const colorNames = getColorNamesById(product.colorIds || []);

        return (
          <ProductRow
            key={id}
            product={product}
            index={index + (currentPage - 1) * itemsPerPage}
            category={category}
            colors={colorNames}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </>
  );
};

export default ProductList;
