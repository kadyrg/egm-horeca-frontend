import { Input } from "../ui/input";

function AuthFormInput({ ...props }: React.ComponentProps<typeof Input>) {
  return <Input className="h-[42px]" {...props} />;
}

export { AuthFormInput };
