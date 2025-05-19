"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Wallet, Lock } from "lucide-react"
import Image from "next/image"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    title: string
    price: string
    description: string
    features: string[]
  }
  serviceType: string
}

export function CheckoutModal({ isOpen, onClose, plan, serviceType }: CheckoutModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    hosting: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          plan: plan.title,
          price: plan.price,
          serviceType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit order")
      }

      toast.success("Votre commande a été enregistrée avec succès!")
      onClose()
      router.push("/dashboard/orders")
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finaliser votre commande</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour commander le forfait {plan.title}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-lg">{plan.title}</h3>
              <p className="text-2xl font-bold mt-1">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              {serviceType === "web-development" && (
                <div className="space-y-4">
                  <Label className="text-base">Options d'hébergement</Label>
                  <RadioGroup
                    value={formData.hosting}
                    onValueChange={(value) => handleRadioChange("hosting", value)}
                    className="grid grid-cols-3 gap-4"
                  >
                    <Card className={`cursor-pointer transition-colors ${formData.hosting === "standard" ? "border-primary bg-primary/5" : ""}`}>
                      <CardContent className="p-4">
                        <RadioGroupItem value="standard" id="standard" className="sr-only" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Standard</h4>
                          <p className="text-sm text-muted-foreground">Hébergement mutualisé</p>
                          <p className="font-bold">9.99€/mois</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer transition-colors ${formData.hosting === "premium" ? "border-primary bg-primary/5" : ""}`}>
                      <CardContent className="p-4">
                        <RadioGroupItem value="premium" id="premium" className="sr-only" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Premium</h4>
                          <p className="text-sm text-muted-foreground">Serveur VPS</p>
                          <p className="font-bold">29.99€/mois</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer transition-colors ${formData.hosting === "enterprise" ? "border-primary bg-primary/5" : ""}`}>
                      <CardContent className="p-4">
                        <RadioGroupItem value="enterprise" id="enterprise" className="sr-only" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Enterprise</h4>
                          <p className="text-sm text-muted-foreground">Serveur dédié</p>
                          <p className="font-bold">99.99€/mois</p>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-4 block">Paiement par carte bancaire</Label>
                  <div className="space-y-4 p-6 border rounded-lg bg-muted/50">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value)
                          setFormData((prev) => ({ ...prev, cardNumber: formatted }))
                        }}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Date d'expiration</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            const formatted = formatExpiry(e.target.value)
                            setFormData((prev) => ({ ...prev, cardExpiry: formatted }))
                          }}
                          placeholder="MM/AA"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCVC">CVC</Label>
                        <Input
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
                      <Lock className="h-4 w-4" />
                      <span>Paiement 100% sécurisé</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Des informations supplémentaires sur votre projet..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || (serviceType === "web-development" && !formData.hosting)} 
                  className="min-w-[150px]"
                >
                  {loading ? "Traitement..." : "Payer par carte"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 