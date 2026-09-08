import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins once
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger };
export default gsap;
