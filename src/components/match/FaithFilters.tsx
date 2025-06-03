
import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FaithFiltersProps {
  filters: {
    denomination: string;
    radius: number;
    sameDenomination: boolean;
    nonSmoker: boolean;
    wantChildren: boolean | null;
  };
  onFiltersChange: (filters: any) => void;
}

export const FaithFilters = ({ filters, onFiltersChange }: FaithFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      denomination: '',
      radius: 50,
      sameDenomination: false,
      nonSmoker: false,
      wantChildren: null,
    });
  };

  const denominations = [
    'Methodist',
    'Presbyterian',
    'Pentecostal',
    'Baptist',
    'Catholic',
    'Anglican',
    'Seventh-day Adventist',
    'Other',
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Faith & Preference Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>

          {/* Denomination */}
          <div className="space-y-2">
            <Label>Denomination</Label>
            <Select 
              value={filters.denomination} 
              onValueChange={(value) => updateFilter('denomination', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any denomination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any denomination</SelectItem>
                {denominations.map((denom) => (
                  <SelectItem key={denom} value={denom}>
                    {denom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Radius */}
          <div className="space-y-2">
            <Label>Distance: {filters.radius}km</Label>
            <Slider
              value={[filters.radius]}
              onValueChange={(value) => updateFilter('radius', value[0])}
              max={200}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          {/* Same Denomination Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="same-denomination">Same denomination only</Label>
            <Switch
              id="same-denomination"
              checked={filters.sameDenomination}
              onCheckedChange={(checked) => updateFilter('sameDenomination', checked)}
            />
          </div>

          {/* Non-smoker Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="non-smoker">Non-smoker only</Label>
            <Switch
              id="non-smoker"
              checked={filters.nonSmoker}
              onCheckedChange={(checked) => updateFilter('nonSmoker', checked)}
            />
          </div>

          {/* Want Children */}
          <div className="space-y-2">
            <Label>Want children</Label>
            <RadioGroup
              value={filters.wantChildren === null ? 'any' : filters.wantChildren.toString()}
              onValueChange={(value) => {
                if (value === 'any') {
                  updateFilter('wantChildren', null);
                } else {
                  updateFilter('wantChildren', value === 'true');
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any preference</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="yes" />
                <Label htmlFor="yes">Wants children</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="no" />
                <Label htmlFor="no">No children</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
