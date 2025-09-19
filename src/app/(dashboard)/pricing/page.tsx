import { Suspense } from "react";
import { getStripePrices, getStripeProducts } from "@/lib/payments/stripe";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PlanToggle } from "@/components/pricing/PlanToggle";
import { PricingCard } from "@/components/pricing/PricingCard";
import Loading from "./loading";
import {
  Sparkles,
  Bot,
  Zap,
  Dna,
  Code,
  Video,
  BrainCircuit,
  Plus,
  Ticket,
} from "lucide-react";

export const revalidate = 3600;

const icons: { [key: string]: React.ReactNode } = {
  "Access to GPT-5": <Sparkles className="h-5 w-5 shrink-0" />,
  "Limited file uploads": <Bot className="h-5 w-5 shrink-0" />,
  "Limited and slower image generation": <Zap className="h-5 w-5 shrink-0" />,
  "Limited memory and context": <Dna className="h-5 w-5 shrink-0" />,
  "Limited deep research": <Code className="h-5 w-5 shrink-0" />,
  "GPT-5 with advanced reasoning": <Sparkles className="h-5 w-5 shrink-0" />,
  "Expanded messaging and uploads": <Bot className="h-5 w-5 shrink-0" />,
  "Expanded and faster image creation": <Zap className="h-5 w-5 shrink-0" />,
  "Expanded memory and context": <Dna className="h-5 w-5 shrink-0" />,
  "Expanded deep research and agent mode": (
    <Code className="h-5 w-5 shrink-0" />
  ),
  "Projects, tasks, custom GPTs": <BrainCircuit className="h-5 w-5 shrink-0" />,
  "Sora video generation": <Video className="h-5 w-5 shrink-0" />,
  "Codex agent": <Plus className="h-5 w-5 shrink-0" />,
  "GPT-5 with pro reasoning": <Sparkles className="h-5 w-5 shrink-0" />,
  "Unlimited messages and uploads": <Bot className="h-5 w-5 shrink-0" />,
  "Unlimited and faster image creation": <Zap className="h-5 w-5 shrink-0" />,
  "Maximum memory and context": <Dna className="h-5 w-5 shrink-0" />,
  "Maximum deep research and agent mode": <Code className="h-5 w-5 shrink-0" />,
  "Expanded projects, tasks, and custom GPTs": (
    <BrainCircuit className="h-5 w-5 shrink-0" />
  ),
  "Expanded Sora video generation": <Video className="h-5 w-5 shrink-0" />,
  "Expanded Codex agent": <Plus className="h-5 w-5 shrink-0" />,
  "Research preview of new features": <Ticket className="h-5 w-5 shrink-0" />,
};

const freePlanFeatures = [
  { text: "Access to GPT-5", icon: icons["Access to GPT-5"] },
  { text: "Limited file uploads", icon: icons["Limited file uploads"] },
  {
    text: "Limited and slower image generation",
    icon: icons["Limited and slower image generation"],
  },
  {
    text: "Limited memory and context",
    icon: icons["Limited memory and context"],
  },
  { text: "Limited deep research", icon: icons["Limited deep research"] },
];

const plusPlanFeatures = [
  {
    text: "GPT-5 with advanced reasoning",
    icon: icons["GPT-5 with advanced reasoning"],
  },
  {
    text: "Expanded messaging and uploads",
    icon: icons["Expanded messaging and uploads"],
  },
  {
    text: "Expanded and faster image creation",
    icon: icons["Expanded and faster image creation"],
  },
  {
    text: "Expanded memory and context",
    icon: icons["Expanded memory and context"],
  },
  {
    text: "Expanded deep research and agent mode",
    icon: icons["Expanded deep research and agent mode"],
  },
  {
    text: "Projects, tasks, custom GPTs",
    icon: icons["Projects, tasks, custom GPTs"],
  },
  { text: "Sora video generation", icon: icons["Sora video generation"] },
  { text: "Codex agent", icon: icons["Codex agent"] },
];

const proPlanFeatures = [
  { text: "GPT-5 with pro reasoning", icon: icons["GPT-5 with pro reasoning"] },
  {
    text: "Unlimited messages and uploads",
    icon: icons["Unlimited messages and uploads"],
  },
  {
    text: "Unlimited and faster image creation",
    icon: icons["Unlimited and faster image creation"],
  },
  {
    text: "Maximum memory and context",
    icon: icons["Maximum memory and context"],
  },
  {
    text: "Maximum deep research and agent mode",
    icon: icons["Maximum deep research and agent mode"],
  },
  {
    text: "Expanded projects, tasks, and custom GPTs",
    icon: icons["Expanded projects, tasks, and custom GPTs"],
  },
  {
    text: "Expanded Sora video generation",
    icon: icons["Expanded Sora video generation"],
  },
  { text: "Expanded Codex agent", icon: icons["Expanded Codex agent"] },
  {
    text: "Research preview of new features",
    icon: icons["Research preview of new features"],
  },
];

async function PricingContent() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const plusPlan = products.find((product) => product.name === "Plus");
  const proPlan = products.find((product) => product.name === "Pro");

  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);
  const proPrice = prices.find((price) => price.productId === proPlan?.id);

  return (
    <div className="flex justify-center gap-6 flex-col md:flex-row px-4">
      <PricingCard
        plan="Free"
        price="0"
        priceSubtitle="EUR / month"
        description="Intelligence for everyday tasks"
        features={freePlanFeatures}
        isCurrentPlan={true}
        buttonText="Your current plan"
        footerText="Have an existing plan?"
      />

      <PricingCard
        plan="Plus"
        price={plusPrice?.unitAmount ? (plusPrice.unitAmount / 100).toString() : "23"}
        priceSubtitle="EUR / month"
        vatText={
          plusPrice?.unitAmount
            ? `(includes €${((plusPrice.unitAmount / 100) * 0.21).toFixed(2)} of VAT)`
            : ""
        }
        description="More access to advanced intelligence"
        features={plusPlanFeatures}
        isPopular={true}
        buttonText="Get Plus"
        priceId={plusPrice?.id}
      />

      <PricingCard
        plan="Pro"
        price={proPrice?.unitAmount ? (proPrice.unitAmount / 100).toString() : "229"}
        priceSubtitle="EUR / month"
        vatText={
          proPrice?.unitAmount
            ? `(includes €${((proPrice.unitAmount / 100) * 0.21).toFixed(2)} of VAT)`
            : ""
        }
        description="Full access to the best of ChatGPT"
        features={proPlanFeatures}
        buttonText="Get Pro"
        priceId={proPrice?.id}
        footerText="Unlimited subject to abuse guardrails."
      />
    </div>
  );
}


export default function PricingPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <PricingHeader />
      <PlanToggle />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<Loading />}>
          <PricingContent />
        </Suspense>
      </main>
    </div>
  );
}
