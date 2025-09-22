
import { Button } from "@/components/ui/button";
import { ShieldCheck, Wallet, Pencil, Monitor, TrendingUp, Users, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Wallets", href: "#" },
  { name: "FAQ", href: "#" },
];

const stats = [
  { value: "$30B", label: "Digital Currency Exchanged" },
  { value: "10M+", label: "Trusted Wallets Investor" },
  { value: "195", label: "Countries Supported" },
];

const features = [
  {
    icon: <Wallet className="w-8 h-8 text-primary" />,
    title: "Connect your wallet",
    description: "We have a variety of wallets that you can choose from.",
  },
  {
    icon: <Pencil className="w-8 h-8 text-primary" />,
    title: "Select your quantity",
    description: "Upload your crypto and set a title, description and price.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Confirm transaction",
    description: "Earn by selling your crypto on our marketplace.",
  },
  {
    icon: <Monitor className="w-8 h-8 text-primary" />,
    title: "Receive your own funds",
    description: "Invest and hold your crypto to high risk, high rewards.",
  },
];

export default function CryptoLandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">Crypto</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {item.name}
            </Link>
          ))}
        </nav>
        <Button variant="outline">Sign Up</Button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Buy and sell with the lowest fees in the industry
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                Buy and sell 150+ cryptocurrencies with 20+ fiat currencies using bank transfers or your credit/debit card.
              </p>
              <Button size="lg">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/seed/crypto-hero/600/600"
                alt="Abstract crypto illustration"
                width={500}
                height={500}
                className="rounded-full object-cover animate-pulse"
                data-ai-hint="glowing crypto coin"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-card py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                            <p className="text-muted-foreground mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why choose us</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                     <div key={feature.title} className="bg-card p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                        <div className="bg-muted rounded-full p-4 mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground flex-grow">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Explore the exciting world of crypto
                </h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Start your journey today. Create an account to begin buying, selling, and trading digital assets securely and efficiently.
                </p>
                <Button variant="secondary" size="lg">Get Started Now</Button>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">Crypto</span>
            </div>
            <div className="flex gap-6 items-center">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    {item.name}
                    </Link>
                ))}
            </div>
             <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Crypto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
