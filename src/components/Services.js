import React from 'react';
import { BsCloudArrowUp } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { FaFingerprint } from "react-icons/fa";

const features = [
  {
    name: 'Real-Time Weather Updates',
    description:
      'Provides live weather data, including temperature, precipitation, and wind speed for your current location.',
    icon: BsCloudArrowUp,
  },
  {
    name: 'Severe Weather Alerts',
    description:
      'Sends instant notifications about severe weather conditions like storms or hurricanes affecting your area.',
    icon: MdLockOutline,
  },
  {
    name: 'Daily Forecasts',
    description:
      'Offers detailed weather predictions for the upcoming week, including temperature, humidity, and chance of rain.',
    icon: HiOutlineArrowPath,
  },
  {
    name: 'Custom Weather Reports',
    description:
      'Generates personalized weather summaries based on specific preferences, such as activity planning or travel needs.',
    icon: FaFingerprint,
  },
]

export default function Services() {
  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
         {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Comprehensive Weather Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Explore real-time updates, severe weather alerts, daily forecasts, 
          and custom reports tailored to your needs. Stay informed and plan ahead with precision and confidence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
