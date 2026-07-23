'use client';

import React from 'react';

/**
 * Volumetric warm gold god rays using CSS gradients and light blend modes.
 */
export default function GodRayLight() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-5 transition-opacity duration-1000"
      style={{
        background: `radial-gradient(circle at 25% 20%, rgba(217, 179, 106, 0.16) 0%, transparent 65%),
                     linear-gradient(135deg, rgba(217, 179, 106, 0.08) 0%, transparent 50%)`,
        mixBlendMode: 'screen'
      }}
    />
  );
}
