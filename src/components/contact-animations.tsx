'use client'

import React from 'react'

export default function ContactAnimations() {
  return (
    <style jsx global>{`
      @keyframes glow {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      
      @keyframes pulse-slow {
        0%, 100% {
          opacity: 0.7;
        }
        50% {
          opacity: 0.9;
        }
      }
      
      @keyframes glow-slow {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          opacity: 0;
        }
      }
      
      @keyframes spin-slow {
        0% {
          transform: translate(-50%, -25%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -25%) rotate(360deg);
        }
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 2s infinite;
      }
      
      .animate-glow-slow {
        animation: glow-slow 3s infinite;
      }
      
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
      }
      
      .glow-button {
        box-shadow: 0 0 15px 2px rgba(255, 249, 77, 0.6),
                    0 0 30px 5px rgba(255, 249, 77, 0.3),
                    0 0 45px 10px rgba(255, 249, 77, 0.15);
      }
    `}</style>
  )
}
