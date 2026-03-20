import { MarketingPage } from "@/components/landing/MarketingPage";

export default function CareersPage() {
  return (
    <MarketingPage
      intro="We are not actively hiring yet, but we care about thoughtful product, operations, and marketplace talent."
      label="Careers"
      title="Small team, big workflow problem."
    >
      <div className="rounded-[32px] border border-cream-300 bg-white p-8 text-brown-500">
        <p>We&apos;re still early. If you care deeply about trust, marketplaces, and clear product systems, reach out through the contact page.</p>
      </div>
    </MarketingPage>
  );
}
