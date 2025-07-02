import { useState } from 'react';
import { Search, Image as ImageIcon } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([
    {
      id: 1,
      src: 'https://nocode.meituan.com/photo/search?keyword=cat&width=400&height=300',
      alt: '猫咪图片'
    },
    {
      id: 2,
      src: 'https://nocode.meituan.com/photo/search?keyword=dog&width=400&height=300',
      alt: '狗狗图片'
    },
    {
      id: 3,
      src: 'https://nocode.meituan.com/photo/search?keyword=nature&width=400&height=300',
      alt: '自然风景'
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const newImage = {
        id: Date.now(),
        src: `https://nocode.meituan.com/photo/search?keyword=${encodeURIComponent(searchTerm)}&width=400&height=300`,
        alt: searchTerm
      };
      setImages([...images, newImage]);
      setSearchTerm('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">图片展示应用</h1>
          <p className="text-xl text-gray-600">搜索并添加您喜欢的图片</p>
          
          <form onSubmit={handleSearch} className="mt-8 max-w-md mx-auto">
            <div className="flex shadow-sm rounded-md">
              <div className="relative flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-l-md pl-10 py-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="输入关键词搜索图片"
                />
              </div>
              <button
                type="submit"
                className="-ml-px relative inline-flex items-center px-4 py-3 border border-indigo-600 text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                搜索
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="p-4 flex items-center">
                <ImageIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 truncate">{image.alt}</span>
              </div>
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-gray-50">
                <button 
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => window.open(image.src, '_blank')}
                >
                  查看大图
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
