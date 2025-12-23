import { Badge } from "@/components/ui/badge";

interface FilterButtonsProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  allLabel: string;
  getLabel?: (id: string) => string;
}

export function FilterButtons({ options, selected, onSelect, allLabel, getLabel }: FilterButtonsProps) {
  const displayLabel = (id: string) => getLabel ? getLabel(id) : id;
  const allId = "all";
  
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selected === allId ? "default" : "outline"}
        className="cursor-pointer hover-elevate active-elevate-2 px-4 py-2"
        onClick={() => onSelect(allId)}
        data-testid="filter-all"
      >
        {allLabel}
      </Badge>
      {options.map((option) => (
        <Badge
          key={option}
          variant={selected === option ? "default" : "outline"}
          className="cursor-pointer hover-elevate active-elevate-2 px-4 py-2"
          onClick={() => onSelect(option)}
          data-testid={`filter-${option.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {displayLabel(option)}
        </Badge>
      ))}
    </div>
  );
}
