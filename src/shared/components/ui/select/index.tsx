import { Select as RadixSelect } from '@radix-ui/themes';

const Select = RadixSelect.Root;
const SelectTrigger = RadixSelect.Trigger;
const SelectContent = RadixSelect.Content;
const SelectGroup = RadixSelect.Group;
const SelectLabel = RadixSelect.Label;
const SelectItem = RadixSelect.Item;
const SelectSeparator = RadixSelect.Separator;

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectContent.displayName = 'SelectContent';
SelectGroup.displayName = 'SelectGroup';
SelectLabel.displayName = 'SelectLabel';
SelectItem.displayName = 'SelectItem';
SelectSeparator.displayName = 'SelectSeparator';

export { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator };
