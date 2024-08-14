import { AlertDialog as RadixAlertDialog } from "@radix-ui/themes";

const AlertDialog = RadixAlertDialog.Root;
const AlertDialogTrigger = RadixAlertDialog.Trigger;
const AlertDialogContent = RadixAlertDialog.Content;
const AlertDialogTitle = RadixAlertDialog.Title;
const AlertDialogDescription = RadixAlertDialog.Description;
const AlertDialogAction = RadixAlertDialog.Action;
const AlertDialogCancel = RadixAlertDialog.Cancel;

AlertDialog.displayName = "AlertDialog";
AlertDialogTrigger.displayName = "AlertDialogTrigger";
AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogTitle.displayName = "AlertDialogTitle";
AlertDialogDescription.displayName = "AlertDialogDescription";
AlertDialogAction.displayName = "AlertDialogAction";
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
