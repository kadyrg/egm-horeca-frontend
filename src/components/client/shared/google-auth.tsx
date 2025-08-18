import { Button } from "../ui/button";
import { GoogleIcon } from "../ui/icons";

function GoogleAuth({ text } : { text: string }) {
  return (
    <Button variant={"outline"} className="h-[42px] w-full"><GoogleIcon />{text}</Button>
  );
};

export { GoogleAuth };
