import { Section } from "@/components/client/ui/section";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Section>
        <h1 className="font-bold text-xl m-2">EGM</h1>
      </Section>
      {children}
    </>
  );
}
