import { Dialog as RadixDialog } from '@radix-ui/themes';

const Dialog = RadixDialog.Root;
const DialogTrigger = RadixDialog.Trigger;
const DialogContent = RadixDialog.Content;
const DialogTitle = RadixDialog.Title;
const DialogDescription = RadixDialog.Description;
const DialogClose = RadixDialog.Close;

Dialog.displayName = 'Dialog';
DialogTrigger.displayName = 'DialogTrigger';
DialogContent.displayName = 'DialogContent';
DialogTitle.displayName = 'DialogTitle';
DialogDescription.displayName = 'DialogDescription';
DialogClose.displayName = 'DialogClose';

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose };
