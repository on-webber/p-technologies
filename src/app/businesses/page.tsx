
import InnerPage from "@/components/InnerPage";

export default function BusinessesPage() {
  return (
    <InnerPage
      eyebrow="OUR BUSINESSES"
      title="Building across technology."
      description="Our business vision brings together technology initiatives under one corporate identity."
      sections={[
        {
          heading: "P Fintech",
          description: "A planned financial technology division exploring payment infrastructure, financial operations and intelligent financial software.",
        },
        {
          heading: "P Technologies",
          description: "The parent technology brand focused on digital products, software engineering and innovation.",
        },
      ]}
    />
  );
}
