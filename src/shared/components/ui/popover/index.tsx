import { Popover as RadixPopover } from '@radix-ui/themes';

const Popover = RadixPopover.Root;
const PopoverTrigger = RadixPopover.Trigger;
const PopoverContent = RadixPopover.Content;
const PopoverClose = RadixPopover.Close;

Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';
PopoverClose.displayName = 'PopoverClose';

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
