import React from "react";

const ProcessSection = ({ home }) => (
  <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
    <div className="mx-auto max-w-7xl">
      <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
        {home.processEyebrow}
      </p>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <h2 className="font-crimson text-4xl font-medium leading-tight md:text-6xl">
          {home.processTitle}
        </h2>
        <p className="font-montserrat text-base leading-8 text-gray-300 md:text-lg">
          {home.processIntro}
        </p>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
        {(home.processSteps || []).map((step, index) => (
          <article key={step._key} className="bg-black p-8 md:p-10">
            {/* Numbered by position: 01, 02, 03. */}
            <span className="font-montserrat text-xs font-semibold tracking-[0.2em] text-primary-color">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-7 font-crimson text-3xl font-medium">
              {step.title}
            </h3>
            <p className="mt-4 font-montserrat text-sm leading-7 text-gray-300">
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
