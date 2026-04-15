import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Marquee } from '../ui/3d-testimonails';

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Chen",
    role: "Clinical Researcher",
    body: "The predictive accuracy of the diabetes model is astounding. It processes vectors faster than any proprietary software we've used before.",
    img: "https://i.pravatar.cc/150?img=43"
  },
  {
    name: "James Wilson",
    role: "Health-Tech Enthusiast",
    body: "HealthAI hide a complex ML backend. The stress prediction module perfectly correlated with my own wearable device data.",
    img: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Elena Rodriguez",
    role: "Med-School Student",
    body: "Using this platform as a study reference for predictive diagnostics has been incredible. Truly futuristic.",
    img: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Dr. Robert Singh",
    role: "Cardiologist",
    body: "HealthAI's heart disease probability assessment is extremely reliable. It's a secondary screening tool in my practice.",
    img: "https://i.pravatar.cc/150?img=60"
  },
  {
    name: "Anita Bose",
    role: "Data Scientist",
    body: "The underlying random forest classification visualizations are pure art. Highly scalable and extremely accurate.",
    img: "https://i.pravatar.cc/150?img=44"
  },
  {
    name: "Michael Chang",
    role: "UX Researcher",
    body: "Finally, a medical platform that doesn't feel like it was built in 1999. The interaction design is 10/10.",
    img: "https://i.pravatar.cc/150?img=33"
  }
];

function TestimonialCard({ img, name, role, body }) {
  return (
    <Card className="w-[300px] border border-white/10 bg-[#111827]/60 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
          <Avatar className="size-10 border border-white/10">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-slate-800 text-white font-bold">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="text-sm font-bold text-white tracking-tight leading-none mb-1 truncate">
              {name}
            </div>
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest leading-none">
              {role}
            </div>
          </div>
        </div>
        <blockquote className="text-sm text-slate-300 leading-relaxed font-medium">"{body}"</blockquote>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0f1c] py-24 flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-20 w-full mb-16 px-6 text-center">
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Trusted by Professionals</h3>
        <p className="mx-auto mt-2 max-w-lg text-slate-400 text-lg">
          See how medical experts utilize our predictive diagnostics worldwide.
        </p>
      </div>

      {/* Adding 'group' here so ANY hover in the container stops all marquees */}
      <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden z-10" style={{ perspective: '1200px' }}>
        
        {/* The 3D tilted container */}
        <div
          className="flex flex-row items-center gap-6"
          style={{
            transform: 'rotateX(20deg) rotateY(-10deg) rotateZ(10deg) translateZ(-50px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Column 1 */}
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s] [--gap:1.5rem]">
            {TESTIMONIALS.map((review, i) => (
              <TestimonialCard key={`col1-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 2 */}
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:25s] [--gap:1.5rem]">
            {[...TESTIMONIALS].reverse().map((review, i) => (
              <TestimonialCard key={`col2-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 3 */}
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:45s] [--gap:1.5rem]">
            {TESTIMONIALS.map((review, i) => (
              <TestimonialCard key={`col3-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 4 */}
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:30s] [--gap:1.5rem] hidden md:flex">
            {[...TESTIMONIALS].reverse().map((review, i) => (
              <TestimonialCard key={`col4-${i}`} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Gradient overlays to mask edges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0a0f1c] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0f1c] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0f1c] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0f1c] to-transparent z-20" />
      </div>
    </section>
  );
}
