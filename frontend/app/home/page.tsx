import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DigiFlow Agency - Home",
  description: "Welcome to DigiFlow Agency - Your digital transformation partner",
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Home</h1>
      <p className="text-lg mb-4">Welcome to DigiFlow Agency</p>
    </div>
  )
} 