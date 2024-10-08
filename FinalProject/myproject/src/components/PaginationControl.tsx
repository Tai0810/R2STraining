import React from "react";
import Button from "./Button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationControl: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
      <Button
        label="Previous"
        onClick={onPrevious}
        disabled={currentPage === 1}
      />
      <Button
        label="Next"
        onClick={onNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default PaginationControl;
