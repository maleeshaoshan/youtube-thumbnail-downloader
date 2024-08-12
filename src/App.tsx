import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

const YouTubeThumbnailDownloader = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<Thumbnail | null>(null);

  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleDownloadThumbnail = () => {
    if (selectedThumbnail) {
      const a = document.createElement('a');
      a.href = selectedThumbnail.url;
      a.download = 'thumbnail.jpg';
      a.click();
    }
  };

  const handleGetThumbnails = () => {
    if (videoUrl) {
      const videoId = videoUrl.split('v=')[1];
      const thumbnails: Thumbnail[] = [
        { url: `https://img.youtube.com/vi/${videoId}/default.jpg`, width: 120, height: 90 },
        { url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
        { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
        { url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, width: 640, height: 480 },
        { url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, width: 1280, height: 720 },
      ];
      setThumbnails(thumbnails);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">YouTube Thumbnail Downloader</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={handleVideoUrlChange}
        placeholder="Enter YouTube video URL"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={handleGetThumbnails}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get Thumbnails
      </button>
      {thumbnails.length > 0 && (
        <div className="flex flex-wrap justify-center mb-4">
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className="w-1/2 p-2">
              <img
                src={thumbnail.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded cursor-pointer"
                onClick={() => setSelectedThumbnail(thumbnail)}
              />
            </div>
          ))}
        </div>
      )}
      {selectedThumbnail && (
        <button
          onClick={handleDownloadThumbnail}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <Download size={24} className="mr-2" />
          Download Thumbnail
        </button>
      )}
    </div>
  );
};

export default YouTubeThumbnailDownloader;