import React from 'react';
import { TrendingUp, Eye, ShoppingBag, BarChart3 } from 'lucide-react';
import Card from '../shared/Card';

const Features = () => {
  const features = [
    {
      icon: <Eye size={32} className="text-primary" />,
      title: "Multi-Branch Oversight",
      description: "Monitor all your locations from one unified dashboard. Real-time sales, performance metrics, and insights across Bomas, Kahawa, and Syokimau."
    },
    {
      icon: <ShoppingBag size={32} className="text-primary" />,
      title: "Simple POS",
      description: "Lightning-fast order entry with an intuitive interface. Your staff can process orders in seconds with our touch-optimized design."
    },
    {
      icon: <BarChart3 size={32} className="text-primary" />,
      title: "Real-Time Reports",
      description: "Get instant insights into your business. Track sales trends, top-selling items, and payment methods at a glance."
    },
    {
      icon: <TrendingUp size={32} className="text-primary" />,
      title: "Growth Analytics",
      description: "Compare performance across branches, identify trends, and make data-driven decisions to grow your business."
    }
  ];
  
  return (
    <div className="py-20 px-4 bg-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
            Everything You Need to Run Your Restaurant
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built specifically for multi-location restaurants like Koven Kafe. 
            Affordable, reliable, and easy to use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-accent mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary to-accent text-white">
            <h3 className="text-2xl font-display font-bold mb-2">Ready to Transform Your Business?</h3>
            <p className="text-secondary mb-4">Experience the demo and see how easy restaurant management can be.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-3xl">📱</span>
                <span>Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-3xl">⚡</span>
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-3xl">💰</span>
                <span>Affordable</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Features;
