import { DropdownNavigation } from "@/components/elements/DropdownNavigation";
import BentoGridIntro from "@/components/landing/bent-grid";
import Hero from "@/components/landing/Hero/Hero";

export default function Home() {
  return (
    <>
      <DropdownNavigation />
      <Hero />
      <Wrapper>
        <BentoGridIntro />
      </Wrapper>
    </>
  );
}

interface PageProps {
  children: React.ReactNode;
}

function Wrapper({ children }: PageProps) {
  return (
    <section className="mx-auto  max-w-[1440px] px-4 sm:px-6 lg:px-8">
      {children}
    </section>
  );
}
