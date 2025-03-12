"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(2)
    }, 2000)
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
            onClick={() => router.push("/pricing")}
            className="mr-4 text-gray-400 hover:text-purple-400"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-white">Checkout</h1>
            <p className="text-gray-400">Complete your purchase</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="md:col-span-2">
                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Payment Information</CardTitle>
                    <CardDescription>Enter your payment details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <RadioGroup
                          defaultValue="credit-card"
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="grid grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
                            <Label
                              htmlFor="credit-card"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-900/50 p-4 hover:bg-gray-800/50 hover:border-purple-600 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-900/20 [&:has([data-state=checked])]:border-purple-600"
                            >
                              <CreditCard className="mb-3 h-6 w-6 text-gray-400" />
                              <span className="text-sm font-medium text-white">Credit Card</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-900/50 p-4 hover:bg-gray-800/50 hover:border-purple-600 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-900/20 [&:has([data-state=checked])]:border-purple-600"
                            >
                              <svg className="mb-3 h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.876-.03.2a.81.81 0 0 1-.79.68h-2.99a.403.403 0 0 1-.4-.34v-.06c.03-.18.06-.36.11-.55l2.17-13.78a.57.57 0 0 1 .44-.5h6.5c.38 0 .74.1 1.06.3.364.243.65.62.79 1.09v.01c.032.12.065.25.09.38z" />
                                <path d="M8.95 8.478a.805.805 0 0 1 .792-.678h5.04c.59 0 1.17.19 1.57.62.428.452.695 1.028.79 1.64a3.6 3.6 0 0 1 .02.34c-.792 4.044-3.33 5.442-6.59 5.442h-1.67c-.36 0-.7.27-.75.64l-.8 5.05c-.03.15-.14.28-.29.28H4.48a.355.355 0 0 1-.35-.42l2.12-12.86c.05-.29.29-.5.58-.5h2.04c.04 0 .08.01.08.01v-.08z" />
                              </svg>
                              <span className="text-sm font-medium text-white">PayPal</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="apple-pay" id="apple-pay" className="peer sr-only" />
                            <Label
                              htmlFor="apple-pay"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-900/50 p-4 hover:bg-gray-800/50 hover:border-purple-600 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-900/20 [&:has([data-state=checked])]:border-purple-600"
                            >
                              <svg className="mb-3 h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.42 9.87c-.14 1.1.27 2.14.77 2.84.52.69 1.14 1.29 2.01 1.29.81 0 1.12-.5 2.08-.5.97 0 1.35.5 2.09.49.86-.01 1.42-.48 1.94-1.17.55-.75.77-1.46.78-1.5-.04-.02-1.5-.63-1.51-2.27-.01-1.34.99-2.02 1.11-2.11-.73-1.01-1.81-1.06-2.17-1.06-1.06-.05-1.88.57-2.3.57-.47 0-1.16-.53-1.99-.51-.97.01-1.94.56-2.45 1.47-.99 1.71-.26 4.21.69 5.93.49.89 1.06 1.87 1.83 1.84.72-.03 1.01-.47 1.87-.47.83 0 1.09.47 1.85.45.78-.01 1.26-.86 1.74-1.74.53-.83.75-1.66.77-1.7-.02-.01-1.48-.62-1.48-2.28 0-1.4 1.15-2.09 1.2-2.13-.8-1.14-2.04-1.06-2.35-1.06-1.15-.01-2.04.63-2.48.63z" />
                                <path d="M11.65 4.53c.56-.69.96-1.66.85-2.64-.94.06-2.03.64-2.67 1.39-.57.67-.96 1.63-.85 2.6 1.01.08 2.09-.53 2.67-1.35z" />
                              </svg>
                              <span className="text-sm font-medium text-white">Apple Pay</span>
                            </Label>
                          </div>
                        </RadioGroup>

                        {paymentMethod === "credit-card" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <Label htmlFor="card-name" className="text-white">
                                  Name on Card
                                </Label>
                                <Input
                                  id="card-name"
                                  placeholder="John Doe"
                                  className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white"
                                />
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor="card-number" className="text-white">
                                  Card Number
                                </Label>
                                <Input
                                  id="card-number"
                                  placeholder="1234 5678 9012 3456"
                                  className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="expiry" className="text-white">
                                  Expiry Date
                                </Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvc" className="text-white">
                                  CVC
                                </Label>
                                <Input
                                  id="cvc"
                                  placeholder="123"
                                  className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <div className="flex h-5 items-center">
                            <input
                              id="save-card"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-purple-600 focus:ring-purple-600"
                            />
                          </div>
                          <Label htmlFor="save-card" className="text-sm text-gray-400">
                            Save payment information for future purchases
                          </Label>
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>Pay Now</>
                            )}
                          </Button>
                        </div>

                        <div className="flex items-center justify-center text-xs text-gray-400">
                          <Lock className="h-3 w-3 mr-1" />
                          Secure payment processed by Stripe
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pro Plan (Monthly)</span>
                        <span className="text-white">$29.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax</span>
                        <span className="text-white">$2.90</span>
                      </div>
                      <div className="border-t border-gray-800 pt-4 flex justify-between font-medium">
                        <span className="text-white">Total</span>
                        <span className="text-white">$31.90</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-4">
                    <div className="text-sm text-gray-400">
                      <p>Your subscription will renew automatically on the 15th of each month.</p>
                      <p className="mt-2">You can cancel anytime from your account settings.</p>
                    </div>

                    <div className="flex items-center text-sm text-purple-400">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      <button onClick={() => router.push("/pricing")} className="hover:underline">
                        Return to pricing
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/20 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
                <p className="text-gray-400 mb-6">
                  Thank you for your purchase. Your Pro plan is now active and ready to use.
                </p>

                <div className="bg-gray-900/50 rounded-lg p-4 mb-6 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Order ID</span>
                    <span className="text-white">DH-{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-white">$31.90</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                    onClick={() => router.push("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-800 text-gray-400 hover:bg-gray-800/50"
                    onClick={() => router.push("/")}
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

