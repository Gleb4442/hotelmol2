import { useState } from "react";
import { Button } from "@/components/ui/button";
import DemoRequestModal from "../DemoRequestModal";

export default function DemoRequestModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Demo Request Modal</Button>
      <DemoRequestModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
