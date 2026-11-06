
import InnerPage from "@/components/InnerPage";

export default function AboutPage() {
  return (
    <InnerPage
      eyebrow="ABOUT P TECHNOLOGIES"
      title="A vision to build what comes next."
      description="P Technologies is an emerging technology venture focused on developing digital products, intelligent platforms and technology-driven solutions."
      sections={[
        {
          heading: "Our Vision",
          description: "To build useful, reliable and scalable technology that addresses meaningful problems.",
        },
        {
          heading: "Our Mission",
          description: "To turn ideas into thoughtfully engineered products and platforms.",
        },
        {
          heading: "Our Philosophy",
          description: "Innovation, responsible development, simplicity and long-term thinking.",
        },
        {
          heading: "Our Direction",
          description: "Developing technology initiatives across software, financial technology and digital infrastructure.",
        },
      ]}
    />
  );
}
