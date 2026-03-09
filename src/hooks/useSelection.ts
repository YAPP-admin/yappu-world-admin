import { useState } from 'react';

export const useSelection = (ids: string[]) => {
  const [selected, setSelected] = useState<string[]>([]);

  const isAllChecked =
    ids.length > 0 && ids.every((id) => selected.includes(id));

  const toggleAll = () => (isAllChecked ? setSelected([]) : setSelected(ids));

  const toggleOne = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

  return {
    selected,
    setSelected,
    isAllChecked,
    toggleAll,
    toggleOne,
  };
};
