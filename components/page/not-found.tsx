'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const JOKES = [
  <>We looked everywhere. Under the bed, in the fridge, even inside the <code>node_modules</code> folder... but we couldn't find this page.</>,
  <>We checked the <code>git log</code>, but it seems this page was force-pushed into oblivion.</>,
  <>It works on my machine... but clearly not on yours. This page is missing.</>,
  <>We tried to <code>catch</code> this page, but it threw an unhandled exception and vanished.</>,
  <>This page is like a missing semicolon in C++ code—invisible, yet causing major problems.</>,
  <>We looked in the cache, flushed the DNS, and restarted the server. Still nothing.</>,
  <>This page has been deprecated. Please upgrade to <code>v2.0</code> of your expectations.</>,
  <>Even <strong>Stack Overflow</strong> doesn't have an answer for where this page went.</>,
  <>The page is currently in an infinite loop. We'll let you know if it ever returns.</>,
  <>We asked the AI to generate this page, but it hallucinated and deleted it instead.</>
];

export default function NotFound() {
  const [randomJoke, setRandomJoke] = useState<React.ReactNode>(JOKES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * JOKES.length);
    setRandomJoke(JOKES[randomIndex]);
  }, []);

  return (
    <div className="notFoundContainer">
      <motion.div 
        className="contentWrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="iconContainer">
          <FiSearch className="searchIcon" />
        </div>
        
        <h1 className="errorCode">404</h1>
        <h2 className="title">Page Not Found</h2>
        
        <p className="joke">
          {randomJoke}
        </p>

        {/* The Tiny Excuse */}
        <p className="excuse">
          (Sorry, our developer thinks he's funny <br/>Please forgive the bad joke)
        </p>

        <Link href="/" className="homeBtn">
          <FiHome />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}