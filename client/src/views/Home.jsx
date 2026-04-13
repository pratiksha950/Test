"use client";

import React from "react";

import { SplineScene } from "../components/ui/spline";
import { Card } from "../components/ui/card";
import { Spotlight } from "../components/ui/spotlight";

import { motion } from "framer-motion";

import NavbarPatient from "../components/NavbarPatient";

import {
  Stethoscope,
  Bed,
  UserCheck,
  Activity
} from "lucide-react";
import Footer from "../components/Footer";

/* =========================
   FEATURE CARD
========================= */

const FeatureCard = ({
  icon: Icon,
  title,
  desc
}) => {
  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
      bg-white/5
      backdrop-blur-lg
      border border-white/10
      rounded-xl
      p-6
      text-center
      shadow-xl"
    >

      <Icon
        className="
        mx-auto
        mb-4
        text-cyan-400"
        size={40}
      />

      <h3
        className="
        text-xl
        font-semibold
        text-white"
      >
        {title}
      </h3>

      <p
        className="
        text-gray-400
        mt-2"
      >
        {desc}
      </p>

    </motion.div>

  );
};


/* =========================
   MAIN HOME
========================= */

function Home() {

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-cyan-900
      text-white
      overflow-hidden"
    >

      {/* NAVBAR */}
      <NavbarPatient />

      {/* ================= HERO ================= */}

      <section
        className="
        relative
        w-full
        h-screen"
      >

        {/* Spotlight Effect */}

        <Spotlight
          className="
          -top-40
          left-0
          md:left-60
          md:-top-20"
        />

        <div
          className="
          grid
          md:grid-cols-2
          h-full"
        >

          {/* LEFT SIDE */}

          <div
            className="
            flex
            flex-col
            justify-center
            px-10
            z-10"
          >

            <motion.h1
              initial={{
                opacity: 0,
                y: 40
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 1
              }}
              className="
              text-5xl
              md:text-6xl
              font-bold
              bg-gradient-to-b
              from-white
              to-gray-400
              bg-clip-text
              text-transparent"
            >

              Smart Hospital
              <br />
              Management System

            </motion.h1>

            <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5
              }}
              className="
              mt-6
              text-lg
              text-gray-400
              max-w-lg"
            >

              Experience the future of healthcare
              with AI-powered hospital management,
              real-time bed tracking, and smart
              appointment systems.

            </motion.p>

            {/* BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="
              mt-8
              w-fit
              px-6
              py-3
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-600
              font-semibold"
            >

              Get Started

            </motion.button>

          </div>

          {/* RIGHT SIDE 3D */}

          <div
            className="
            relative
            w-full
            h-full"
          >

            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        className="
        py-20
        px-10
        bg-gradient-to-b
        from-black
        to-gray-900"
      >

        <motion.h2
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          className="
          text-4xl
          font-bold
          text-center
          mb-14"
        >

          Smart Hospital Features

        </motion.h2>

        <div
          className="
          grid
          md:grid-cols-4
          gap-8"
        >

          <FeatureCard
            icon={UserCheck}
            title="Smart Appointments"
            desc="Book doctor visits instantly with AI scheduling."
          />

          <FeatureCard
            icon={Bed}
            title="Live Bed Tracking"
            desc="Monitor hospital beds availability in real-time."
          />

          <FeatureCard
            icon={Stethoscope}
            title="Doctor Dashboard"
            desc="Manage patient records efficiently."
          />

          <FeatureCard
            icon={Activity}
            title="Health Monitoring"
            desc="Track vital signs with smart sensors."
          />

        </div>

      </section>

      {/* ================= DEMO CARD ================= */}

      <section
        className="
        px-10
        pb-20"
      >

        <Card
          className="
          w-full
          h-[500px]
          bg-black/[0.96]
          relative
          overflow-hidden"
        >

          <Spotlight
            className="
            -top-40
            left-0
            md:left-60
            md:-top-20"
          />

          <div
            className="
            flex
            h-full"
          >

            {/* TEXT */}

            <div
              className="
              flex-1
              p-10
              flex
              flex-col
              justify-center"
            >

              <h2
                className="
                text-4xl
                font-bold"
              >

                Interactive 3D Hospital

              </h2>

              <p
                className="
                mt-4
                text-gray-400"
              >

                Explore hospital floors,
                manage rooms, and visualize
                patient flows in real-time
                using advanced 3D technology.

              </p>

            </div>

            {/* SPLINE */}

            <div
              className="
              flex-1
              relative"
            >

              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />

            </div>

          </div>

        </Card>

      </section>
      <Footer />

    </div>

  );

}

export default Home;