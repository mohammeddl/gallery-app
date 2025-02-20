'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LikeButtonProps {
  imageId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ imageId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`/api/likes/${imageId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
          }
          return;
        }

        const data = await response.json();
        setIsLiked(data.isLiked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    if (imageId) {
      checkLikeStatus();
    }
  }, [imageId, router]);

  const toggleLike = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/likes/${imageId}`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
        return;
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="absolute bottom-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      aria-label={isLiked ? 'Unlike image' : 'Like image'}
    >
      <Heart 
        size={20}
        className={`${
          isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
        } ${loading ? 'opacity-50' : ''}`}
      />
    </button>
  );
};

export default LikeButton;