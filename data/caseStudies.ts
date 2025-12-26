export interface CaseStudy {
  id: string;
  hotelKey: string;
  locationKey: string;
  type: "Single Hotel" | "Chain" | "Hostel";
  region: "Europe" | "Asia" | "Americas";
  image: string;
  quoteKey: string;
  nameKey: string;
  roleKey: string;
  challengeKey: string;
  solutionKey: string;
  metrics: Array<{
    labelKey: string;
    value: string;
  }>;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "grand-europa-hotel",
    hotelKey: "cases.case1.hotel",
    locationKey: "cases.case1.location",
    type: "Single Hotel",
    region: "Europe",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case1.quote",
    nameKey: "cases.case1.name",
    roleKey: "cases.case1.role",
    challengeKey: "cases.case1.challenge",
    solutionKey: "cases.case1.solution",
    metrics: [
      { labelKey: "cases.case1.metric1.label", value: "+42%" },
      { labelKey: "cases.case1.metric2.label", value: "2.3s" },
      { labelKey: "cases.case1.metric3.label", value: "+18%" }
    ]
  },
  {
    id: "eurostay-hostel-chain",
    hotelKey: "cases.case2.hotel",
    locationKey: "cases.case2.location",
    type: "Chain",
    region: "Europe",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case2.quote",
    nameKey: "cases.case2.name",
    roleKey: "cases.case2.role",
    challengeKey: "cases.case2.challenge",
    solutionKey: "cases.case2.solution",
    metrics: [
      { labelKey: "cases.case2.metric1.label", value: "12" },
      { labelKey: "cases.case2.metric2.label", value: "8" },
      { labelKey: "cases.case2.metric3.label", value: "60%" }
    ]
  },
  {
    id: "coastal-resort-spa",
    hotelKey: "cases.case3.hotel",
    locationKey: "cases.case3.location",
    type: "Single Hotel",
    region: "Europe",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case3.quote",
    nameKey: "cases.case3.name",
    roleKey: "cases.case3.role",
    challengeKey: "cases.case3.challenge",
    solutionKey: "cases.case3.solution",
    metrics: [
      { labelKey: "cases.case3.metric1.label", value: "+34%" },
      { labelKey: "cases.case3.metric2.label", value: "+52%" },
      { labelKey: "cases.case3.metric3.label", value: "+28%" }
    ]
  },
  {
    id: "tokyo-business-hotel",
    hotelKey: "cases.case4.hotel",
    locationKey: "cases.case4.location",
    type: "Single Hotel",
    region: "Asia",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case4.quote",
    nameKey: "cases.case4.name",
    roleKey: "cases.case4.role",
    challengeKey: "cases.case4.challenge",
    solutionKey: "cases.case4.solution",
    metrics: [
      { labelKey: "cases.case4.metric1.label", value: "+38%" },
      { labelKey: "cases.case4.metric2.label", value: "95%" },
      { labelKey: "cases.case4.metric3.label", value: "+24%" }
    ]
  },
  {
    id: "miami-beach-resort",
    hotelKey: "cases.case5.hotel",
    locationKey: "cases.case5.location",
    type: "Single Hotel",
    region: "Americas",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case5.quote",
    nameKey: "cases.case5.name",
    roleKey: "cases.case5.role",
    challengeKey: "cases.case5.challenge",
    solutionKey: "cases.case5.solution",
    metrics: [
      { labelKey: "cases.case5.metric1.label", value: "+45%" },
      { labelKey: "cases.case5.metric2.label", value: "1.8s" },
      { labelKey: "cases.case5.metric3.label", value: "+31%" }
    ]
  },
  {
    id: "asian-hostel-group",
    hotelKey: "cases.case6.hotel",
    locationKey: "cases.case6.location",
    type: "Hostel",
    region: "Asia",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case6.quote",
    nameKey: "cases.case6.name",
    roleKey: "cases.case6.role",
    challengeKey: "cases.case6.challenge",
    solutionKey: "cases.case6.solution",
    metrics: [
      { labelKey: "cases.case6.metric1.label", value: "18" },
      { labelKey: "cases.case6.metric2.label", value: "12" },
      { labelKey: "cases.case6.metric3.label", value: "70%" }
    ]
  },
  {
    id: "latin-america-chain",
    hotelKey: "cases.case7.hotel",
    locationKey: "cases.case7.location",
    type: "Chain",
    region: "Americas",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case7.quote",
    nameKey: "cases.case7.name",
    roleKey: "cases.case7.role",
    challengeKey: "cases.case7.challenge",
    solutionKey: "cases.case7.solution",
    metrics: [
      { labelKey: "cases.case7.metric1.label", value: "25" },
      { labelKey: "cases.case7.metric2.label", value: "+36%" },
      { labelKey: "cases.case7.metric3.label", value: "+29%" }
    ]
  },
  {
    id: "boutique-hotel-prague",
    hotelKey: "cases.case8.hotel",
    locationKey: "cases.case8.location",
    type: "Single Hotel",
    region: "Europe",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case8.quote",
    nameKey: "cases.case8.name",
    roleKey: "cases.case8.role",
    challengeKey: "cases.case8.challenge",
    solutionKey: "cases.case8.solution",
    metrics: [
      { labelKey: "cases.case8.metric1.label", value: "+50%" },
      { labelKey: "cases.case8.metric2.label", value: "+40%" },
      { labelKey: "cases.case8.metric3.label", value: "+22%" }
    ]
  },
  {
    id: "nordic-mountain-resort",
    hotelKey: "cases.case9.hotel",
    locationKey: "cases.case9.location",
    type: "Single Hotel",
    region: "Europe",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case9.quote",
    nameKey: "cases.case9.name",
    roleKey: "cases.case9.role",
    challengeKey: "cases.case9.challenge",
    solutionKey: "cases.case9.solution",
    metrics: [
      { labelKey: "cases.case9.metric1.label", value: "+300%" },
      { labelKey: "cases.case9.metric2.label", value: "6 Languages" },
      { labelKey: "cases.case9.metric3.label", value: "+47%" }
    ]
  },
  {
    id: "urban-business-suites",
    hotelKey: "cases.case10.hotel",
    locationKey: "cases.case10.location",
    type: "Single Hotel",
    region: "Asia",
    image: "/api/placeholder/400/300",
    quoteKey: "cases.case10.quote",
    nameKey: "cases.case10.name",
    roleKey: "cases.case10.role",
    challengeKey: "cases.case10.challenge",
    solutionKey: "cases.case10.solution",
    metrics: [
      { labelKey: "cases.case10.metric1.label", value: "100%" },
      { labelKey: "cases.case10.metric2.label", value: "<1s" },
      { labelKey: "cases.case10.metric3.label", value: "+55%" }
    ]
  }
];
