"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const stats = [
  { value: "€12K", label: "Saved on projects" },
  { value: "847", label: "Verified pros" },
  { value: "4.9★", label: "Average rating" }
];

const projects = [
  {
    title: "Kitchen Renovation",
    meta: "3 of 3 quotes received · Updated 2h ago",
    badge: "Ready to compare"
  },
  {
    title: "Bathroom Remodel",
    meta: "Milestone 2 of 4 complete · Due in 3 days",
    badge: "In progress"
  }
];

export function Hero() {
  return (
    <section className="container-shell pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Home Services Marketplace
        </motion.span>
        <motion.h1
          className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-brown-800 sm:text-7xl lg:text-[92px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <span className="block">Kill the guesswork.</span>
          <span className="block text-terracotta-500">Ship the renovation.</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brown-400 sm:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          Verified pros, transparent quotes, and escrow-protected payments. Your next renovation is one click away.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <Button className="min-w-44" href="/app/find-pros">
            Find a pro
          </Button>
          <Button className="min-w-44" href="#how-it-works" variant="secondary">
            See how it works
          </Button>
        </motion.div>
        <p className="mt-4 text-sm text-brown-400">No credit card required</p>
      </div>

      <motion.div
        className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[32px] border border-cream-300 bg-white shadow-warm"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center gap-3 border-b border-cream-300 bg-cream-50 px-5 py-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="rounded-full border border-cream-300 bg-white px-4 py-1 text-sm text-brown-400">
            app.renno.com
          </div>
        </div>
        <div className="grid gap-6 bg-cream-50 p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-[24px] border border-cream-300 bg-white p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + index * 0.1 }}
              >
                <div className="font-serif text-4xl text-brown-800">{stat.value}</div>
                <p className="mt-2 text-sm text-brown-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="rounded-[26px] bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-brown-800">{project.title}</p>
                    <p className="mt-2 text-sm text-brown-400">{project.meta}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      index === 0 ? "bg-terracotta-50 text-terracotta-700" : "bg-sage-50 text-sage-700"
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
