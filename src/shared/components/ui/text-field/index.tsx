import { TextField as RadixTextField } from '@radix-ui/themes';

const TextField = RadixTextField.Root;
const TextFieldSlot = RadixTextField.Slot;

TextField.displayName = 'TextField';
TextFieldSlot.displayName = 'TextFieldSlot';

export { TextField, TextFieldSlot };
