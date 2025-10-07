import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Cpu, Brain, Database, Bot } from 'lucide-react';

export default function AIHome() {
  useEffect(() => {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes = Array(60).fill().map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 180, 255, 0.6)';
      ctx.strokeStyle = 'rgba(0, 180, 255, 0.15)';
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = node.x - nodes[j].x;
          const dy = node.y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  const icons = [
    { Icon: Brain, label: 'Neural Networks' },
    { Icon: Cpu, label: 'AI Hardware' },
    { Icon: Database, label: 'Big Data' },
    { Icon: Bot, label: 'Automation' },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 py-16 space-y-10 overflow-hidden">
      <canvas id="bgCanvas" className="absolute inset-0 -z-10"></canvas>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-white via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Home to the Future of AI-Based Products
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-3xl text-center text-gray-300 leading-relaxed text-lg"
      >
        Welcome to our Big Data and AI Incubator — a product-focused powerhouse. We specialize in nurturing innovative AI-driven products from concept to market. By leveraging vast datasets and cutting-edge machine learning technologies, we transform groundbreaking ideas into tangible solutions. Join us to create the next generation of intelligent, data-driven products and lead the market with innovation.
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {icons.map(({ Icon, label }) => (
          <motion.div
            key={label}
            whileHover={{
              scale: 1.1,
              boxShadow: '0px 0px 25px rgba(0,180,255,0.8)',
            }}
            className="flex flex-col items-center justify-center h-32 w-32 bg-gradient-to-br from-blue-900 via-sky-800 to-blue-700 rounded-2xl text-center shadow-2xl cursor-pointer space-y-2 border border-sky-400/40 backdrop-blur-md"
          >
            <Icon size={42} className="text-sky-300 drop-shadow-md" />
            <span className="text-sm text-gray-200 font-medium tracking-wide">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12"
      >
        <img
          src="/images/walkingrobot.gif"
          alt="Walking Robot Animation"
          className="rounded-2xl shadow-2xl scale-60"
          style={{ transform: 'scale(0.6)' }}
        />
      </motion.div>
    </div>
  );
}
