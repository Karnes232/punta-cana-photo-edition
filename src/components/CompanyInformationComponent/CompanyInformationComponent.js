import React, { useEffect, useState } from "react";

const CompanyInformationComponent = ({
  yearsInBusiness,
  eventsPlanned,
  clientSatisfaction,
}) => {
  const [countYears, setCountYears] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const [countSatisfaction, setCountSatisfaction] = useState(0);

  // Update these values to match your actual business stats
  const targetYears = yearsInBusiness;
  const targetEvents = eventsPlanned;
  const targetSatisfaction = clientSatisfaction;

  // Animated counter effect
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const framesPerSecond = 60;
    const totalFrames = (animationDuration / 1000) * framesPerSecond;

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      if (frame <= totalFrames) {
        setCountYears(Math.ceil(progress * targetYears));
        setCountEvents(Math.ceil(progress * targetEvents));
        setCountSatisfaction(Math.ceil(progress * targetSatisfaction));
      } else {
        clearInterval(timer);
      }
    }, 1000 / framesPerSecond);

    return () => clearInterval(timer);
  }, [targetYears, targetEvents, targetSatisfaction]);
  return (
    <div className="w-full bg-gray-100 py-16 -mt-3 md:-mt-10 lg:-mt-20 xl:-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Years in Business */}
          <div className="w-full md:w-1/3 text-center px-4 mb-8 md:mb-0">
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-blue-800">
                {countYears}+
              </span>
              <p className="uppercase tracking-wide text-sm xl:text-base font-semibold mt-2 text-gray-700">
                Years in Business
              </p>
            </div>
          </div>

          {/* Events Planned */}
          <div className="w-full md:w-1/3 text-center px-4 mb-8 md:mb-0 border-y md:border-y-0 md:border-x border-gray-300 py-8 md:py-0">
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-blue-800">
                {countEvents}+
              </span>
              <p className="uppercase tracking-wide text-sm xl:text-base font-semibold mt-2 text-gray-700">
                Events Planned
              </p>
            </div>
          </div>

          {/* Client Satisfaction */}
          <div className="w-full md:w-1/3 text-center px-4">
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-blue-800">
                {countSatisfaction}%
              </span>
              <p className="uppercase tracking-wide text-sm xl:text-base font-semibold mt-2 text-gray-700">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationComponent;
