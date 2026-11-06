
import InnerPage from "@/components/InnerPage";

export default function TechnologyPage() {
  return (
    <InnerPage
      eyebrow="TECHNOLOGY"
      title="Engineering ideas into digital products."
      description="Our technology direction centres on building dependable software, intelligent platforms and scalable digital systems."
      sections={[
        {
          heading: "Software Engineering",
          description: "Building maintainable and reliable software applications.",
        },
        {
          heading: "Digital Platforms",
          description: "Creating connected platforms and business-oriented software.",
        },
        {
          heading: "Data & Intelligence",
          description: "Exploring data analysis, automation and intelligent systems.",
        },
        {
          heading: "Infrastructure",
          description: "Designing secure and scalable technical foundations.",
        },
      ]}
    />
  );
}
