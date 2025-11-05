import { useState, useEffect, useRef } from 'react';

export type FilterType = 'generation' | 'position' | 'role' | null;

export interface SelectedFilters {
  generation: string;
  position: string;
  role: string;
}

export const useTableFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    generation: '',
    role: '',
    position: '',
  });

  const [openFilterType, setOpenFilterType] = useState<FilterType>(null);
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);

  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const handleFilterClick = (index: number, type: FilterType) => {
    if (openFilterType === type && openFilterIndex === index) {
      setOpenFilterType(null);
      setOpenFilterIndex(null);
      return;
    }

    const button = filterRefs.current[index];
    if (button) {
      const rect = button.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 20,
      });
    }

    setOpenFilterIndex(index);
    setOpenFilterType(type);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const popoverEl = popoverRef.current;
      const isInPopover = popoverEl?.contains(e.target as Node);
      const isInFilterButton = filterRefs.current.some((btn) =>
        btn?.contains(e.target as Node),
      );

      if (!isInPopover && !isInFilterButton) {
        setOpenFilterIndex(null);
        setOpenFilterType(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectFilter = (type: FilterType, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [type!]: value }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      generation: '',
      role: '',
      position: '',
    });
    setOpenFilterType(null);
    setOpenFilterIndex(null);
  };

  return {
    selectedFilters,
    setSelectedFilters,
    setOpenFilterIndex,
    openFilterType,
    openFilterIndex,
    filterRefs,
    popoverRef,
    popoverPos,
    handleFilterClick,
    handleSelectFilter,
    resetFilters,
  };
};
