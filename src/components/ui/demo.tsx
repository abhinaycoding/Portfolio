import Footer from "@/components/ui/animated-footer";

const DemoOne = () => {
  return (
    <div className="w-full h-[600px] bg-black p-10 overflow-hidden relative">
        <Footer
          leftLinks={[
            { href: "/terms", label: "Terms & policies" },
            { href: "/privacy-policy", label: "Privacy policy" },
          ]}
          rightLinks={[
            { href: "https://x.com/taher_max_", label: "Twitter" },
            { href: "https://www.instagram.com/taher_max_", label: "Instagram" },
            { href: "https://github.com/tahermaxse", label: "GitHub" },
          ]}
          copyrightText="Cluely 2025. All Rights Reserved"
          barCount={30}
        />
    </div>
  );
};

export { DemoOne };
