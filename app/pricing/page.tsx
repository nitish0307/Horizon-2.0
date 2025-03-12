"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Check, X, ArrowRight, HelpCircle, CreditCard, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PricingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      description: "For individuals and small projects",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { name: "5 IoT devices", included: true },
        { name: "1 channel", included: true },
        { name: "7-day data retention", included: true },
        { name: "Basic visualizations", included: true },
        { name: "Community support", included: true },
        { name: "API access (100 calls/day)", included: true },
        { name: "Real-time monitoring", included: false },
        { name: "AI-powered insights", included: false },
        { name: "Custom dashboards", included: false },
        { name: "Team collaboration", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started",
      popular: false,
      color: "gray",
    },
    {
      name: "Pro",
      description: "For growing IoT deployments",
      price: {
        monthly: 29,
        yearly: 290,
      },
      features: [
        { name: "25 IoT devices", included: true },
        { name: "10 channels", included: true },
        { name: "30-day data retention", included: true },
        { name: "Advanced visualizations", included: true },
        { name: "Email support", included: true },
        { name: "API access (10,000 calls/day)", included: true },
        { name: "Real-time monitoring", included: true },
        { name: "Basic AI insights", included: true },
        { name: "Custom dashboards", included: true },
        { name: "Team collaboration", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "purple",
    },
    {
      name: "Enterprise",
      description: "For large-scale IoT ecosystems",
      price: {
        monthly: 99,
        yearly: 990,
      },
      features: [
        { name: "Unlimited IoT devices", included: true },
        { name: "Unlimited channels", included: true },
        { name: "1-year data retention", included: true },
        { name: "Custom visualizations", included: true },
        { name: "Priority support", included: true },
        { name: "API access (Unlimited)", included: true },
        { name: "Real-time monitoring", included: true },
        { name: "Advanced AI insights", included: true },
        { name: "Custom dashboards", included: true },
        { name: "Team collaboration", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
      color: "gold",
    },
  ]

  const testimonials = [
    {
      quote:
        "Data Horizon has transformed how we manage our IoT infrastructure. The insights we've gained are invaluable for our business operations.",
      author: "Sarah Johnson",
      role: "CTO, TechSolutions Inc.",
      company: "TechSolutions Inc.",
    },
    {
      quote:
        "The real-time monitoring and AI-powered analytics have helped us identify issues before they become problems. Highly recommended!",
      author: "Michael Chen",
      role: "Head of IoT, SmartCity Innovations",
      company: "SmartCity Innovations",
    },
    {
      quote: "We've reduced our operational costs by 30% since implementing Data Horizon. The ROI has been incredible.",
      author: "Emily Rodriguez",
      role: "Operations Director, GreenEnergy",
      company: "GreenEnergy",
    },
  ]

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately, and your billing will be prorated accordingly.",
    },
    {
      question: "What happens when I reach my device limit?",
      answer:
        "When you reach your device limit, you'll need to upgrade to a higher plan to add more devices. You can also remove existing devices to make room for new ones.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, all paid plans come with a 14-day free trial. No credit card required to start. You can upgrade to a paid plan at any time during or after your trial.",
    },
    {
      question: "How does billing work?",
      answer:
        "We bill monthly or yearly, depending on your preference. You can switch between billing cycles at any time. Yearly plans offer a 20% discount compared to monthly billing.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 30 days of your purchase.",
    },
  ]

  const handleSelectPlan = (planName: string) => {
    toast({
      title: `${planName} plan selected`,
      description: "Redirecting to checkout...",
    })

    if (planName === "Free") {
      router.push("/signup")
    } else if (planName === "Enterprise") {
      router.push("/contact")
    } else {
      router.push("/checkout")
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-black z-0" />

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="mr-4 text-gray-400 hover:text-purple-400"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-white">Pricing Plans</h1>
            <p className="text-gray-400">Choose the right plan for your needs</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Pricing Tabs */}
        <Tabs defaultValue="plans" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-900/60 backdrop-blur-sm border border-gray-800">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="plans">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="relative bg-gray-900/60 backdrop-blur-sm p-1 rounded-full border border-gray-800 flex items-center">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "ghost"}
                  className={`relative rounded-full px-6 ${
                    billingCycle === "monthly" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === "yearly" ? "default" : "ghost"}
                  className={`relative rounded-full px-6 ${
                    billingCycle === "yearly" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setBillingCycle("yearly")}
                >
                  Yearly
                </Button>

                {billingCycle === "yearly" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 right-2 bg-green-500 text-xs px-2 py-0.5 rounded-full text-white font-medium"
                  >
                    Save 20%
                  </motion.div>
                )}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="perspective-1000"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: plan.popular
                        ? "0 0 20px rgba(147, 51, 234, 0.3)"
                        : "0 0 10px rgba(255, 255, 255, 0.1)",
                      transition: { duration: 0.3 },
                    }}
                    className="h-full"
                  >
                    <Card
                      className={`h-full relative overflow-hidden backdrop-blur-sm ${
                        plan.popular
                          ? "bg-gradient-to-b from-purple-900/40 to-gray-900/40 border-purple-500 shadow-lg shadow-purple-500/20"
                          : plan.name === "Enterprise"
                            ? "bg-gradient-to-b from-amber-900/20 to-gray-900/40 border-amber-700/50"
                            : "bg-gradient-to-b from-gray-800/30 to-gray-900/40 border-gray-800"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -right-12 top-7 bg-purple-600 text-white text-xs font-bold px-12 py-1 rotate-45 shadow-md">
                          MOST POPULAR
                        </div>
                      )}

                      <CardHeader className={`pb-2 ${plan.popular ? "pt-8" : ""}`}>
                        <CardTitle
                          className={`text-2xl ${plan.name === "Enterprise" ? "text-amber-300" : "text-white"}`}
                        >
                          {plan.name}
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="mb-6">
                          <div className="flex items-end">
                            <span
                              className={`text-4xl font-bold ${
                                plan.name === "Enterprise" ? "text-amber-300" : "text-white"
                              }`}
                            >
                              ${plan.price[billingCycle]}
                            </span>
                            {plan.price[billingCycle] > 0 && (
                              <span className="text-gray-400 ml-2">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                            )}
                          </div>
                          {billingCycle === "yearly" && plan.price.yearly > 0 && (
                            <p className="text-green-400 text-sm mt-1">
                              Save ${plan.price.monthly * 12 - plan.price.yearly} annually
                            </p>
                          )}
                        </div>

                        <ul className="space-y-3 mb-6">
                          {plan.features.slice(0, 6).map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                              className="flex items-start"
                            >
                              {feature.included ? (
                                <Check
                                  className={`h-5 w-5 mr-2 shrink-0 ${
                                    plan.name === "Enterprise" ? "text-amber-400" : "text-green-400"
                                  }`}
                                />
                              ) : (
                                <X className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                              )}
                              <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                                {feature.name}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter>
                        <Button
                          className={`w-full group ${
                            plan.popular
                              ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md shadow-purple-600/20"
                              : plan.name === "Enterprise"
                                ? "bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white"
                                : "bg-gray-800 hover:bg-gray-700 text-white"
                          }`}
                          onClick={() => handleSelectPlan(plan.name)}
                        >
                          {plan.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="max-w-6xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="p-4 text-left text-gray-400">Features</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="p-4 text-center">
                          <div
                            className={`text-xl font-bold ${
                              plan.name === "Enterprise" ? "text-amber-300" : "text-white"
                            }`}
                          >
                            {plan.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            ${plan.price[billingCycle]}/{billingCycle === "monthly" ? "mo" : "yr"}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "IoT devices",
                      "Channels",
                      "Data retention",
                      "Visualizations",
                      "Support",
                      "API access",
                      "Real-time monitoring",
                      "AI insights",
                      "Custom dashboards",
                      "Team collaboration",
                      "Priority support",
                    ].map((feature, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-900/30" : ""}>
                        <td className="p-4 border-b border-gray-800/50 text-white">
                          <div className="flex items-center">
                            {feature}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 text-gray-400">
                                    <HelpCircle className="h-3 w-3" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-xs">
                                    {feature === "IoT devices" && "Number of devices you can connect to the platform."}
                                    {feature === "Channels" && "Data streams for organizing your device data."}
                                    {feature === "Data retention" && "How long your data is stored on our platform."}
                                    {feature === "Visualizations" && "Charts and graphs for data analysis."}
                                    {feature === "Support" && "Available support channels and response times."}
                                    {feature === "API access" && "API call limits and capabilities."}
                                    {feature === "Real-time monitoring" && "Live data updates and alerts."}
                                    {feature === "AI insights" && "Automated analysis and anomaly detection."}
                                    {feature === "Custom dashboards" && "Create personalized data views."}
                                    {feature === "Team collaboration" && "Multi-user access and permissions."}
                                    {feature === "Priority support" &&
                                      "Faster response times and dedicated assistance."}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </td>
                        {plans.map((plan) => {
                          const featureData = plan.features.find((f) => f.name.includes(feature))
                          let displayValue = ""

                          if (feature === "IoT devices") {
                            displayValue = plan.name === "Free" ? "5" : plan.name === "Pro" ? "25" : "Unlimited"
                          } else if (feature === "Channels") {
                            displayValue = plan.name === "Free" ? "1" : plan.name === "Pro" ? "10" : "Unlimited"
                          } else if (feature === "Data retention") {
                            displayValue = plan.name === "Free" ? "7 days" : plan.name === "Pro" ? "30 days" : "1 year"
                          } else if (feature === "Visualizations") {
                            displayValue = plan.name === "Free" ? "Basic" : plan.name === "Pro" ? "Advanced" : "Custom"
                          } else if (feature === "Support") {
                            displayValue =
                              plan.name === "Free" ? "Community" : plan.name === "Pro" ? "Email" : "Priority"
                          } else if (feature === "API access") {
                            displayValue =
                              plan.name === "Free" ? "100/day" : plan.name === "Pro" ? "10,000/day" : "Unlimited"
                          }

                          return (
                            <td key={`${plan.name}-${feature}`} className="p-4 border-b border-gray-800/50 text-center">
                              {displayValue ? (
                                <span className="text-gray-300">{displayValue}</span>
                              ) : featureData?.included ? (
                                <Check
                                  className={`h-5 w-5 mx-auto ${
                                    plan.name === "Enterprise" ? "text-amber-400" : "text-green-400"
                                  }`}
                                />
                              ) : (
                                <X className="h-5 w-5 mx-auto text-gray-500" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-10 w-10 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Secure Payments</h3>
                <p className="text-gray-400 text-sm">256-bit SSL encryption</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CreditCard className="h-10 w-10 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Multiple Payment Options</h3>
                <p className="text-gray-400 text-sm">Credit Card, PayPal, and more</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-10 w-10 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">30-Day Money Back</h3>
                <p className="text-gray-400 text-sm">No questions asked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 p-6"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>

          <Accordion
            type="single"
            collapsible
            className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 px-6"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800 py-2">
                <AccordionTrigger className="text-white hover:text-purple-400 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-900/40 to-black/40 backdrop-blur-sm p-10 rounded-2xl border border-purple-900/50 text-center"
          >
            <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">Limited Time Offer</Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">Start Your Free Trial Today</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Try any plan free for 14 days. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-600/20"
                onClick={() => router.push("/signup")}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
                onClick={() => router.push("/contact")}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

