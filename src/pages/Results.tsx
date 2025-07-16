import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Ruler, 
  Target, 
  ChevronDown, 
  ChevronUp,
  ArrowLeft,
  BarChart3
} from 'lucide-react';

interface PropertyComparable {
  id: string;
  score: number;
  breakdown: {
    location: number;
    size: number;
    year_built: number;
    zoning: number;
  };
  property: {
    id: string;
    latitude: number;
    longitude: number;
    square_feet: number;
    year_built: number;
    zoning: string;
    address?: string;
  };
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<PropertyComparable[]>([]);
  const [subjectProperty, setSubjectProperty] = useState<any>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedResults = sessionStorage.getItem('searchResults');
    const savedSubject = sessionStorage.getItem('subjectProperty');
    
    if (savedResults && savedSubject) {
      setResults(JSON.parse(savedResults));
      setSubjectProperty(JSON.parse(savedSubject));
    } else {
      navigate('/search');
    }
  }, [navigate]);

  const toggleCardExpansion = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 0.8) return 'default';
    if (score >= 0.6) return 'secondary';
    return 'destructive';
  };

  if (!results.length || !subjectProperty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-dark/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-dark/20">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/search')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text-primary">Starboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-secondary border-secondary">
                {results.length} Comparables Found
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Comparable Properties for Your <span className="gradient-text-secondary">Industrial Site</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Found {results.length} properties that match your criteria with AI-powered precision scoring
          </p>
        </div>

        {/* Subject Property Summary */}
        <Card className="glass-card mb-8 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Your Subject Property
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Ruler className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-semibold">{parseInt(subjectProperty.square_feet).toLocaleString()} sq ft</p>
              </div>
              <div className="text-center">
                <Calendar className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Year Built</p>
                <p className="font-semibold">{subjectProperty.year_built}</p>
              </div>
              <div className="text-center">
                <Building className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Zoning</p>
                <p className="font-semibold">{subjectProperty.zoning}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold text-xs">{subjectProperty.latitude.slice(0, 7)}, {subjectProperty.longitude.slice(0, 8)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid gap-6">
          {results.map((comparable, index) => (
            <Card key={comparable.id} className="glass-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg">{comparable.property.address || `Property ${comparable.property.id}`}</h3>
                      <p className="text-sm text-muted-foreground">Property ID: {comparable.property.id}</p>
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={getScoreBadgeVariant(comparable.score)}
                      className="text-lg px-3 py-1"
                    >
                      {Math.round(comparable.score * 100)}% Match
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCardExpansion(comparable.id)}
                    >
                      {expandedCards.has(comparable.id) ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Key Property Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-semibold">{comparable.property.square_feet.toLocaleString()} sq ft</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year Built</p>
                    <p className="font-semibold">{comparable.property.year_built}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Zoning</p>
                    <p className="font-semibold">{comparable.property.zoning}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-xs">
                      {comparable.property.latitude.toFixed(4)}, {comparable.property.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>

                {/* Expandable Score Breakdown */}
                {expandedCards.has(comparable.id) && (
                  <div className="mt-6 animate-scale-in">
                    <Separator className="mb-4" />
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Compatibility Score Breakdown
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Location Match</span>
                          <span className={getScoreColor(comparable.breakdown.location)}>
                            {Math.round(comparable.breakdown.location * 100)}%
                          </span>
                        </div>
                        <Progress value={comparable.breakdown.location * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Size Match</span>
                          <span className={getScoreColor(comparable.breakdown.size)}>
                            {Math.round(comparable.breakdown.size * 100)}%
                          </span>
                        </div>
                        <Progress value={comparable.breakdown.size * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Age Match</span>
                          <span className={getScoreColor(comparable.breakdown.year_built)}>
                            {Math.round(comparable.breakdown.year_built * 100)}%
                          </span>
                        </div>
                        <Progress value={comparable.breakdown.year_built * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Zoning Match</span>
                          <span className={getScoreColor(comparable.breakdown.zoning)}>
                            {Math.round(comparable.breakdown.zoning * 100)}%
                          </span>
                        </div>
                        <Progress value={comparable.breakdown.zoning * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => navigate('/search')}>
            New Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;