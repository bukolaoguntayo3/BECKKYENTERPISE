import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Heart,
  ShoppingBag,
  Eye,
  Sliders,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductImageZoomProps {
  src: string;
  alt: string;
  productName: string;
  inWishlist?: boolean;
  onToggleWishlist?: () => void;
  badges?: React.ReactNode;
  galleryImages?: string[];
  activeImageIndex?: number;
  onSelectImage?: (index: number) => void;
}

export const ProductImageZoom: React.FC<ProductImageZoomProps> = ({
  src,
  alt,
  productName,
  inWishlist,
  onToggleWishlist,
  badges,
  galleryImages = [],
  activeImageIndex = 0,
  onSelectImage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, xPercent: 50, yPercent: 50 });
  const [zoomLevel, setZoomLevel] = useState<number>(2.5);
  const [zoomMode, setZoomMode] = useState<'pan' | 'loupe'>('pan');
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState<number>(2.5);
  const [modalPan, setModalPan] = useState({ x: 0, y: 0 });
  const [isDraggingModal, setIsDraggingModal] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Reset image error state when src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  // Handle mouse movement for in-place zoom / loupe
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setCoords({ x, y, xPercent, yPercent });
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsTouchActive(false);
  };

  // Touch handlers for mobile pan-inspection
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setCoords({ x, y, xPercent, yPercent });
  }, []);

  const handleTouchStart = () => {
    setIsTouchActive(true);
  };

  // Keyboard shortcut for closing modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);

  // Modal drag to pan handlers
  const handleModalMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingModal(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: modalPan.x,
      panY: modalPan.y
    };
  };

  const handleModalMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingModal) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setModalPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy
    });
  };

  const handleModalMouseUp = () => {
    setIsDraggingModal(false);
  };

  const resetModalZoom = () => {
    setModalZoom(2);
    setModalPan({ x: 0, y: 0 });
  };

  const handleModalWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setModalZoom((prev) => Math.min(5, prev + 0.3));
    } else {
      setModalZoom((prev) => Math.max(1, prev - 0.3));
    }
  };

  const handleModalDoubleClick = () => {
    if (modalZoom > 1.8) {
      resetModalZoom();
    } else {
      setModalZoom(3.5);
    }
  };

  const activeZoomActive = isHovering || isTouchActive;

  return (
    <div className="space-y-3">
      {/* Primary Zoom Viewport Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs select-none cursor-crosshair"
        style={{ touchAction: 'none' }}
        aria-label="Interactive product image with hover-to-zoom inspection"
      >
        {!imageError ? (
          <>
            {/* Base Image or Full In-Place Scaled Image */}
            <div className="w-full h-full overflow-hidden relative">
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                style={
                  zoomMode === 'pan' && activeZoomActive
                    ? {
                        transformOrigin: `${coords.xPercent}% ${coords.yPercent}%`,
                        transform: `scale(${zoomLevel})`
                      }
                    : {
                        transform: 'scale(1)'
                      }
                }
                className="w-full h-full object-cover object-center pointer-events-none will-change-transform transition-transform duration-300 ease-out"
              />

              {/* Jeweler's Loupe Mode Lens Overlay */}
              {zoomMode === 'loupe' && activeZoomActive && (
                <div
                  className="pointer-events-none absolute w-48 h-48 rounded-full border-2 border-amber-400 shadow-2xl overflow-hidden ring-4 ring-slate-950/30"
                  style={{
                    left: `${coords.x - 96}px`,
                    top: `${coords.y - 96}px`,
                    backgroundImage: `url(${src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${(containerRef.current?.clientWidth || 500) * zoomLevel}px ${(containerRef.current?.clientHeight || 375) * zoomLevel}px`,
                    backgroundPosition: `${-(coords.x * zoomLevel - 96)}px ${-(coords.y * zoomLevel - 96)}px`
                  }}
                >
                  {/* Loupe Lens Crosshair & Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-transparent to-white/25 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-t border-l border-amber-400/60 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] font-mono font-bold text-amber-300">
                    {zoomLevel}x
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Texture Grid Backdrop for transparent or dark luxury images */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-amber-50 text-slate-400">
            <ShoppingBag className="w-16 h-16 text-amber-500/50 mb-3" />
            <span className="text-sm text-slate-600 font-medium">{productName}</span>
          </div>
        )}

        {/* Status Tags (Softly fade on zoom so image corners can be inspected) */}
        <div
          className={`absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10 transition-opacity duration-200 ${
            activeZoomActive ? 'opacity-30 hover:opacity-100' : 'opacity-100'
          }`}
        >
          {badges}
        </div>

        {/* Wishlist Floating Button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${
              inWishlist
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/95 text-slate-600 hover:text-rose-600 hover:bg-white border border-slate-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Inspection Hint HUD / Floating Badge on Hover */}
        <div
          className={`absolute bottom-3 left-3 z-10 flex items-center gap-2 transition-all duration-200 ${
            activeZoomActive ? 'opacity-90' : 'opacity-70 group-hover:opacity-100'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-white text-[11px] font-medium shadow-sm">
            <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">
              {activeZoomActive ? `Magnified ${zoomLevel}x · Move to Pan` : 'Hover to Inspect Detail'}
            </span>
            <span className="sm:hidden">
              {activeZoomActive ? `${zoomLevel}x Zoom` : 'Touch & Drag to Zoom'}
            </span>
          </div>
        </div>

        {/* Fullscreen Modal Trigger Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
            setModalZoom(2.5);
            setModalPan({ x: 0, y: 0 });
          }}
          title="Open high-resolution visual loupe"
          aria-label="Open fullscreen image inspector"
          className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-lg bg-slate-950/80 hover:bg-amber-600 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center transition-colors shadow-sm"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom Control Bar (Luxury Toolbar) */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-600">
        {/* Left: Mode Toggle & Magnification Level */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Detail Zoom:
          </span>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {[2, 2.5, 3.5].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setZoomLevel(lvl)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all tabular-nums ${
                  zoomLevel === lvl
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {lvl}x
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setZoomMode('pan')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-all ${
                zoomMode === 'pan'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              In-Place Pan
            </button>
            <button
              type="button"
              onClick={() => setZoomMode('loupe')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-all ${
                zoomMode === 'loupe'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Jeweler's Loupe
            </button>
          </div>
        </div>

        {/* Right: Fullscreen Lightbox Button */}
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            setModalZoom(2.5);
            setModalPan({ x: 0, y: 0 });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors py-1"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full-Screen Inspection</span>
        </button>
      </div>

      {/* Fullscreen Luxury Lightbox Inspector Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onMouseMove={handleModalMouseMove}
          onMouseUp={handleModalMouseUp}
          onMouseLeave={handleModalMouseUp}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3 z-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                High-Resolution Luxury Loupe
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-white truncate max-w-md sm:max-w-xl">
                {productName}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-white">
                <button
                  type="button"
                  onClick={() => setModalZoom((prev) => Math.max(1, prev - 0.5))}
                  className="p-1.5 hover:text-amber-400 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono font-semibold tabular-nums text-amber-300">
                  {modalZoom.toFixed(1)}x
                </span>
                <button
                  type="button"
                  onClick={() => setModalZoom((prev) => Math.min(5, prev + 0.5))}
                  className="p-1.5 hover:text-amber-400 transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={resetModalZoom}
                  className="p-1.5 hover:text-amber-400 border-l border-slate-700 transition-colors"
                  title="Reset view"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
                title="Close inspector (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Viewport with Drag-to-Pan */}
          <div
            className={`flex-1 relative overflow-hidden flex items-center justify-center my-4 ${
              isDraggingModal ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleModalMouseDown}
            onWheel={handleModalWheel}
            onDoubleClick={handleModalDoubleClick}
          >
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate(${modalPan.x}px, ${modalPan.y}px) scale(${modalZoom})`,
                transition: isDraggingModal ? 'none' : 'transform 0.15s ease-out'
              }}
              className="max-w-[85vw] max-h-[70vh] object-contain select-none pointer-events-none"
            />

            {/* Drag & Pan Instruction Notice */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-[11px] backdrop-blur-md pointer-events-none">
              Click & drag to pan · Scroll or use buttons to adjust magnification
            </div>
          </div>

          {/* Modal Footer Gallery Angle Switcher */}
          {galleryImages.length > 1 && onSelectImage && (
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-800 z-10 overflow-x-auto">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectImage(idx);
                    resetModalZoom();
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                      : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
