import { Check, Clock3 } from "lucide-react";
import React from "react";

// The strip under the hero: availability first (clock icon), then the three
// fixed promises (check icons).
const TrustBar = ({ availability, items }) => (
  <section className="border-b border-gray-200 bg-white">
    <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
      {[availability, ...items].map((item, index) => {
        const Icon = index === 0 ? Clock3 : Check;
        return (
          <div
            key={item}
            className="flex items-center gap-3 bg-white px-6 py-5 font-montserrat text-xs font-semibold uppercase tracking-[0.08em] text-gray-800"
          >
            <Icon aria-hidden="true" size={19} className="text-primary-color" />
            {item}
          </div>
        );
      })}
    </div>
  </section>
);

export default TrustBar;
