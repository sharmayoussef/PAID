import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassOrb } from '../components/GlassOrb';
import { DownloadButton } from '../components/DownloadButton';
import { GlassContainer } from '../components/GlassContainer';
import { FloatingBubbles } from '../components/FloatingBubbles';
import { Preloader } from '../components/Preloader';
import { SplineBackground } from '../components/SplineBackground';
import { AnimatedLogo } from '../components/AnimatedLogo';

function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');
  const clientName = searchParams.get('client');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (clientName) {
      fetch(`/api/clients/${clientName}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError('Download link not found');
          } else {
            setDownloadLink(data.downloadLink);
          }
        })
        .catch(() => {
          setError('Failed to fetch download link');
        });
    }
  }, [clientName]);

  const handleDownload = () => {
    if (!downloadLink) return;
    setIsDownloading(true);
    window.location.href = downloadLink;
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">
        <SplineBackground />
        <FloatingBubbles />
        
        <GlassOrb className="top-[10%] left-[15%]" size="180px" delay={0} duration={15} />
        <GlassOrb className="top-[20%] right-[10%]" size="150px" delay={2} duration={18} />
        <GlassOrb className="bottom-[15%] left-[20%]" size="200px" delay={1} duration={20} />
        <GlassOrb className="bottom-[20%] right-[15%]" size="160px" delay={3} duration={17} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlassContainer>
            <motion.div
              className="relative z-10 text-center max-w-xl mx-auto space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedLogo />
              
              <motion.h1
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200"
                initial={{ y: -20, rotateX: -15 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                style={{ perspective: "1000px" }}
              >
                Thank you for your purchase!
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-blue-200/80 mb-6"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your digital product is ready for download.
              </motion.p>

              {error && (
                <motion.p
                  className="text-red-400 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center"
              >
                <DownloadButton 
                  onClick={handleDownload}
                  isDownloading={isDownloading}
                  disabled={!downloadLink}
                />
              </motion.div>
            </motion.div>
          </GlassContainer>
        </motion.div>
      </div>
    </>
  );
}

export default ThankYouPage;