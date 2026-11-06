
import InnerPage from "@/components/InnerPage";

export default function InvestorsPage() {
  return (
    <InnerPage
      eyebrow="CORPORATE OVERVIEW"
      title="A long-term vision for technology."
      description="Learn about the direction, business initiatives and long-term ambitions of P Technologies."
      sections={[
        {
          heading: "Business Vision",
          description: "Building a technology-focused organisation with opportunities across multiple digital sectors.",
        },
        {
          heading: "Market Direction",
          description: "Exploring software and infrastructure opportunities in technology and financial services.",
        },
        {
          heading: "Development Strategy",
          description: "Prioritising research, product development, responsible partnerships and sustainable growth.",
        },
        {
          heading: "Enquiries",
          description: "We welcome genuine business, strategic and technology partnership enquiries.",
        },
      ]}
    />
  );
}
