import { useEffect, useRef, useState } from 'react';

export type FilterKey = string;
export type FilterMap<T extends Record<string, string>> = T;

export const useTableFilter = <T extends Record<string, string>>(
  initialFilters: T,
) => {
  const [selectedFilters, setSelectedFilters] =
    useState<FilterMap<T>>(initialFilters);

  const [openFilterType, setOpenFilterType] = useState<keyof T | null>(null);
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);

  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const handleFilterClick = (index: number, key: keyof T) => {
    if (openFilterType === key && openFilterIndex === index) {
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
    setOpenFilterType(key);
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

  const handleSelectFilter = (key: keyof T, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key!]: value }));
  };

  const resetFilters = () => {
    setSelectedFilters(initialFilters);
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
