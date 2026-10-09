"use client";

import React, { useEffect, useState } from "react";
import "./SiteLoader.scss";

export function SiteLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after a short delay or when window is fully loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second loading feel

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`site-loader ${!loading ? "is-hidden" : ""}`}>
      <div className="stage" id="stage">
        <div className="ring-in">
          <svg className="ring" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6fcf33" />
                <stop offset="100%" stopColor="#0692c3" />
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="114" />
          </svg>
        </div>
        <div className="circle-wrap">
          <div className="logo-clip">
            <svg width="249" height="172" viewBox="0 0 249 172" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M130.344 51.8961C168.349 -3.18785 213.821 -3.65731 231.025 2.79784C182.346 28.4228 162.015 59.5249 151.458 86.7147C143.65 72.6824 139.044 65.0437 130.344 51.8961Z" fill="url(#paint0_linear_3561_213)" />
              <path d="M146.375 77.521C159.278 15.1213 199.746 2.99345 231.026 2.79784C182.347 28.4228 162.015 59.5249 151.458 86.7147C146.766 78.3035 146.375 77.521 146.375 77.521Z" fill="url(#paint1_linear_3561_213)" />
              <path d="M178.043 141.753C184.925 146.605 192.901 144.948 196.029 143.514C186.176 150.399 172.826 149.422 167.352 147.596C138.614 140.163 109.081 98.2556 105.757 92.9741C102.434 87.6926 86.5508 62.9224 81.2724 58.8146C75.994 54.7068 62.1137 45.5131 48.429 54.3156C34.7442 63.118 20.6685 82.0922 12.8486 99.8928C6.59271 114.133 7.63536 129.952 8.93867 136.081C5.34153 130.917 1.7053 116.194 0.336822 109.478C-2.00914 73.8766 8.15669 54.3155 22.8189 39.4492C37.4812 24.5828 52.7299 19.1057 73.4525 20.2793C90.6564 21.2537 108.251 34.5589 116.657 45.1219C123.304 49.6209 147.503 91.8728 156.148 109.282C160.713 118.476 171.162 136.902 178.043 141.753Z" fill="url(#paint2_linear_3561_213)" />
              <path d="M122.909 132.754C122.127 132.441 109.745 111.497 103.75 101.26C102.186 104.547 94.1259 119.061 88.6967 126.103C83.4183 132.949 57.6128 159.357 34.7397 124.733C21.2895 96.2526 30.2433 74.7812 36.4991 64.4139C16.1675 84.3662 2.87373 112.997 9.52056 137.057C19.6864 159.552 50.1839 177.744 77.1624 170.311C106.096 162.339 123.886 133.145 122.909 132.754Z" fill="url(#paint3_linear_3561_213)" />
              <path d="M220.66 32.6014C209.32 39.7859 197.2 46.6853 190.163 48.0546C227.698 59.0088 226.134 125.516 200.328 141.361C193.877 145.322 177.533 154.31 153.605 141.165C129.754 127.277 104.796 92.3929 95.3467 76.2225C121.739 121.995 146.371 176.766 190.358 171.485C241.969 162.909 251.939 113.388 248.029 83.0688C244.902 58.8132 228.48 39.3173 220.66 32.6014Z" fill="url(#paint4_linear_3561_213)" />
              <path d="M28.8773 136.401C17.4863 119.932 15.9747 101.616 17.1477 91.4443C20.2756 82.9939 31.2885 69.698 36.6972 64.221C34.3512 67.9376 32.5918 73.0234 31.2234 77.3603C29.1677 83.8757 23.5368 112.537 39.2388 130.728C50.3821 143.639 61.9164 143.834 71.3002 139.922C82.0525 139.76 88.582 142.8 85.7669 145.304C82.2479 148.434 47.254 162.971 28.8773 136.401Z" fill="url(#paint5_linear_3561_213)" />
              <path d="M107.082 107.058C97.1119 122.511 87.1416 133.661 72.0884 143.441L71.3064 139.92C78.9308 136.791 85.4965 129.924 88.9011 125.837C90.8561 123.489 99.4579 110.383 103.759 101.19L107.082 107.058Z" fill="url(#paint6_linear_3561_213)" />
              <path opacity="0.4" d="M233.156 117.339C221.685 155.533 184.017 153.72 170.812 147.549C171.653 147.549 176.763 147.777 184.997 147.153C195.289 146.374 202.235 142.334 208.933 133.074C218.449 119.92 220.262 101.722 218.708 87.4971C217.535 80.4551 216.167 70.2739 206.197 57.9599C200.723 51.896 193.606 48.5505 189.657 48.1608C191.832 48.0049 198.46 44.848 201.503 43.2891C218.009 55.5657 240.998 91.2264 233.156 117.339Z" fill="url(#paint7_linear_3561_213)" />
              <path d="M220.662 32.5316C219.724 34.0965 210.105 39.1823 205.413 41.5296C214.602 46.4199 220.662 48.376 232.978 65.3941C242.391 78.4003 246.468 104.19 247.054 115.666C247.641 113.906 252.137 91.4103 244.317 67.5458C238.061 48.4543 225.94 36.2482 220.662 32.5316Z" fill="url(#paint8_linear_3561_213)" />
              <defs>
                <linearGradient id="paint0_linear_3561_213" x1="130.344" y1="52.8741" x2="231.246" y2="-0.087946" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#43AC20" />
                  <stop offset="1" stopColor="#B1E037" />
                </linearGradient>
                <linearGradient id="paint1_linear_3561_213" x1="146.375" y1="82.0201" x2="231.267" y2="2.65157" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#47AE21" />
                  <stop offset="0.126402" stopColor="#5BC534" />
                  <stop offset="0.307292" stopColor="#A0D54C" />
                  <stop offset="0.489583" stopColor="#A7D950" />
                  <stop offset="1" stopColor="#62C03D" />
                </linearGradient>
                <linearGradient id="paint2_linear_3561_213" x1="7.64588e-07" y1="84.2432" x2="196.029" y2="84.2432" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E7C10" />
                  <stop offset="0.21875" stopColor="#9DD32D" />
                  <stop offset="0.328125" stopColor="#9DD32D" />
                  <stop offset="1" stopColor="#034C9B" />
                </linearGradient>
                <linearGradient id="paint3_linear_3561_213" x1="7.82549" y1="118.243" x2="113.918" y2="133.252" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#011051" />
                  <stop offset="1" stopColor="#001652" />
                </linearGradient>
                <linearGradient id="paint4_linear_3561_213" x1="101.603" y1="93.9515" x2="224.201" y2="42.1659" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#05285F" />
                  <stop offset="0.533376" stopColor="#004183" />
                  <stop offset="0.693237" stopColor="#0362A2" />
                  <stop offset="1" stopColor="#0692C3" />
                </linearGradient>
                <linearGradient id="paint5_linear_3561_213" x1="16.8037" y1="108.25" x2="74.446" y2="143.022" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#001A57" />
                  <stop offset="0.317964" stopColor="#0558A1" stopOpacity="0.682" />
                  <stop offset="0.610811" stopColor="#2E75AE" stopOpacity="0.3892" />
                  <stop offset="0.830819" stopColor="#4881AF" stopOpacity="0.29" />
                  <stop offset="1" stopColor="#4586BB" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint6_linear_3561_213" x1="71.3064" y1="143.441" x2="107.298" y2="108.253" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#026FAD" stopOpacity="0" />
                  <stop offset="0.109375" stopColor="#026FAD" stopOpacity="0" />
                  <stop offset="0.463542" stopColor="#4790B9" />
                  <stop offset="1" stopColor="#036298" stopOpacity="0.51" />
                </linearGradient>
                <linearGradient id="paint7_linear_3561_213" x1="209.129" y1="146.18" x2="204.236" y2="47.3972" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#003C7E" />
                  <stop offset="0.543684" stopColor="#0585BA" />
                  <stop offset="0.674848" stopColor="#0775B2" />
                  <stop offset="1" stopColor="#015B9D" />
                </linearGradient>
                <linearGradient id="paint8_linear_3561_213" x1="216.752" y1="38.3999" x2="248.844" y2="105.48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0FB6D8" />
                  <stop offset="1" stopColor="#0B8ABC" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <p className="caption">LOADING</p>
    </div>
  );
}
