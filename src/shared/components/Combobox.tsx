import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Button } from '../../components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../../components/ui/command'
import { cn } from '../../lib/utils'

type MinimalPropertiesItem = {
  value: string
  label: string
}

interface ComboboxProps {
  searchPlaceholder: string
  selectPlaceholder: string
  items: Array<unknown & MinimalPropertiesItem>
  selectedValue: string
  onSelectValue: (value: string) => void
  emptyMessage?: string
}

export function Combobox({
  searchPlaceholder,
  selectPlaceholder,
  items,
  selectedValue,
  onSelectValue,
  emptyMessage = 'Nenhum resultado encontrado.'
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSelect = (currentValue: string) => {
    if (currentValue === selectedValue) {
      onSelectValue('') // Clear selection if already selected
    } else {
      onSelectValue(currentValue)
    }
    setOpen(false)
  }

  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="flex-1/2 w-full justify-between">
          {selectedValue ? items.find((item) => item.value === selectedValue)?.label : `${selectPlaceholder}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder={`${searchPlaceholder}...`} value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty className="mx-4 my-1">{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', selectedValue === item.value ? 'opacity-100' : 'opacity-0')} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
