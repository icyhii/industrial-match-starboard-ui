import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Search, 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  Zap, 
  Target, 
  Database,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-industrial.jpg';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building,
      title: "Industrial Focus",
      description: "Specialized algorithms designed specifically for industrial properties and zoning requirements",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "AI-Powered Scoring", 
      description: "Advanced machine learning algorithms provide precise compatibility scores for better decisions",
      color: "text-secondary"
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Geographic proximity analysis with transportation, infrastructure, and market accessibility",
      color: "text-accent"
    },
    {
      icon: BarChart3,
      title: "Market Insights",
      description: "Comprehensive property analytics with detailed breakdowns and comparison metrics",
      color: "text-primary"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Analyzed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "50+", label: "Cities Covered" },
    { number: "2.5s", label: "Average Search Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-dark/20">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text-primary">Starboard</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">About</Button>
              <Button variant="starboard" onClick={() => navigate('/search')}>
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern industrial complex" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary-dark/80"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 text-secondary border-secondary">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Property Analysis
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Comparable <br />
              <span className="gradient-text-secondary">Industrial Properties</span> <br />
              with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover the best property matches using advanced algorithms and comprehensive market data. 
              Get precise compatibility scores in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="starboard" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/search')}
              >
                <Search className="w-5 h-5 mr-2" />
                Start Property Search
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Floating geometric shapes */}
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl floating"></div>
            <div className="absolute -top-32 -right-16 w-32 h-32 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl floating-delayed"></div>
            <div className="absolute -bottom-16 left-1/2 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl floating"></div>
          </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="pt-6">
                <div className="text-3xl md:text-4xl font-bold gradient-text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for <span className="gradient-text-secondary">Smart Decisions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced platform combines artificial intelligence with comprehensive market data 
            to deliver unmatched accuracy in property comparisons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card group hover:glow-primary transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text-secondary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get comparable properties in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "01",
              title: "Enter Property Details",
              description: "Input your property's location, size, year built, and zoning information"
            },
            {
              step: "02", 
              title: "AI Analysis",
              description: "Our advanced algorithms analyze thousands of properties to find the best matches"
            },
            {
              step: "03",
              title: "Get Results",
              description: "Receive detailed compatibility scores and comprehensive property comparisons"
            }
          ].map((step, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="glass-card glow-primary animate-scale-in">
          <CardContent className="text-center py-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Find Your Perfect <span className="gradient-text-secondary">Match?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust Starboard for accurate industrial property analysis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="starboard" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/search')}
              >
                <Search className="w-5 h-5 mr-2" />
                Start Your Search Now
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No signup required</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold gradient-text-primary">Starboard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Starboard. Powered by AI for industrial property analysis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
