import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Check } from "lucide-react"
export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-white">
          Simple transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-gray-400 sm:text-lg sm:leading-7">
          Unlock all features including unlimited conversations for your CMS.
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl text-white">
            What&apos;s included in the PRO plan
          </h3>
          <ul className="grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Higher Dashboard Generations Limits
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Unlimited Team Members
            </li>

            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Higher AI Chat Limits
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Dashboard Analytics
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Access to all CMS Integrations
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Premium Support
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold text-gray-200">$20</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          Thriftwise is in beta version.{" "}
          <strong>You can test the upgrade and won&apos;t be charged.</strong>
        </p>
      </div>
    </section>
  )
}