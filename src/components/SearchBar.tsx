
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Tag } from 'lucide-react';

interface SearchBarProps {
  onSearch: (filters: { category: string; postalCode: string; keyword: string }) => void;
}

const categories = [
  'All Categories',
  'Dog Walking',
  'House Cleaning',
  'Plumbing',
  'Electrical',
  'Gardening',
  'Tutoring',
  'Pet Sitting',
  'Handyman',
  'Beauty Services'
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [category, setCategory] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch({ category, postalCode, keyword });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-black">
      {/* Mobile Search */}
      <div className="md:hidden space-y-4">
        <div className="relative">
          <Input
            placeholder="Search services..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-12 h-12 text-lg"
          />
          <Button 
            size="sm" 
            className="absolute right-2 top-2 bg-red-600 hover:bg-red-700"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 hover:shadow-xl transition-shadow">
        <div className="flex-1 flex items-center space-x-4 px-4">
          <div className="flex-1">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-0 shadow-none h-12 text-left">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-px h-8 bg-gray-300"></div>
          
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 shadow-none pl-10 h-12"
            />
          </div>
          
          <div className="w-px h-8 bg-gray-300"></div>
          
          <div className="flex-1">
            <Input
              placeholder="What service do you need?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 shadow-none h-12"
            />
          </div>
        </div>
        
        <Button 
          className="rounded-full h-12 w-12 bg-red-600 hover:bg-red-700 flex-shrink-0"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
