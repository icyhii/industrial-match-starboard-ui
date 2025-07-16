import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { MapPin, Search, Building, Calendar, Ruler, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertySearchData {
  latitude: string;
  longitude: string;
  address: string;
  square_feet: string;
  year_built: string;
  zoning: string;
  num_comparables: number;
}

const PropertySearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PropertySearchData>({
    latitude: '',
    longitude: '',
    address: '',
    square_feet: '',
    year_built: '',
    zoning: '',
    num_comparables: 5
  });

  const handleInputChange = (field: keyof PropertySearchData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    // Validate required fields
    if (!formData.latitude || !formData.longitude || !formData.square_feet || !formData.year_built || !formData.zoning) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const API_BASE_URL = 'https://starboard-dsqy90evu-kunal-singhs-projects-f14fa826.vercel.app';
      
      const response = await fetch(`${API_BASE_URL}/comparable?n=${formData.num_comparables}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          square_feet: parseInt(formData.square_feet),
          year_built: parseInt(formData.year_built),
          zoning: formData.zoning
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const results = await response.json();
      
      // Store results and navigate to results page
      sessionStorage.setItem('searchResults', JSON.stringify(results));
      sessionStorage.setItem('subjectProperty', JSON.stringify(formData));
      
      navigate('/results');
      
    } catch (error) {
      console.error('Error finding comparables:', error);
      toast({
        title: "Search Failed",
        description: "Unable to find comparable properties. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
              <Button variant="ghost" className="text-primary">Search</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect <span className="gradient-text-secondary">Industrial Match</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your property details and discover comparable industrial properties with AI-powered precision
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Search Form */}
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Property Search
                </CardTitle>
                <CardDescription>
                  Enter the details of your subject property to find comparable industrial properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <Label className="text-sm font-semibold">Property Location</Label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude *</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder="34.0522"
                        value={formData.latitude}
                        onChange={(e) => handleInputChange('latitude', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude *</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="-118.2437"
                        value={formData.longitude}
                        onChange={(e) => handleInputChange('longitude', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address (Optional)</Label>
                    <Input
                      id="address"
                      placeholder="123 Industrial Way, Los Angeles, CA"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Property Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-secondary" />
                    <Label className="text-sm font-semibold">Property Details</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="square_feet" className="flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        Square Feet *
                      </Label>
                      <Input
                        id="square_feet"
                        type="number"
                        placeholder="50000"
                        value={formData.square_feet}
                        onChange={(e) => handleInputChange('square_feet', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year_built" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Year Built *
                      </Label>
                      <Input
                        id="year_built"
                        type="number"
                        placeholder="2010"
                        value={formData.year_built}
                        onChange={(e) => handleInputChange('year_built', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Zoning *</Label>
                    <Select value={formData.zoning} onValueChange={(value) => handleInputChange('zoning', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select zoning type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Options */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <Label className="text-sm font-semibold">Search Options</Label>
                  </div>

                  <div>
                    <Label>Number of Comparables: {formData.num_comparables}</Label>
                    <Slider
                      value={[formData.num_comparables]}
                      onValueChange={(value) => handleInputChange('num_comparables', value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  variant="starboard" 
                  size="lg" 
                  className="w-full" 
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Find Comparables
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Map Preview */}
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location Preview
                </CardTitle>
                <CardDescription>
                  Visual preview of your property location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary-dark to-secondary-dark rounded-lg flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {formData.latitude && formData.longitude ? 
                        `Location: ${formData.latitude}, ${formData.longitude}` : 
                        'Enter coordinates to preview location'
                      }
                    </p>
                  </div>
                </div>
                
                {formData.address && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground">{formData.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;