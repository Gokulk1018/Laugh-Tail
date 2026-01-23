export type Reply = {
  user: string;
  text: string;
  replies?: Reply[];
};

export type Discussion = {
  id: string;
  user: string;
  text: string;
  replies: Reply[];
};

export type Place = {
  id: string;
  title: string;
  image: any;
  location: string;
  rating: number;
  categories: string[];
  description: string;
  discussions: Discussion[];
};

export const placesData: Record<string, Place[]> = {
  /* ---------------- NEARBY ---------------- */
  "Nearby Places": [
    {
      id: "marina",
      title: "Marina Beach",
      image: require("../../assets/images/marina.jpg"),
      location: "Chennai, Tamil Nadu",
      rating: 4.6,
      categories: ["Beach", "Urban", "Relax"],
      description:
        "Marina Beach is one of the longest urban beaches in the world.\n\n" +
        "It is a major landmark of Chennai.\n\n" +
        "Popular for sunrise walks and jogging.\n\n" +
        "Street food and local vendors add charm.\n\n" +
        "Swimming is restricted due to strong currents.",
      discussions: [],
    },
    {
      id: "mahabalipuram",
      title: "Mahabalipuram",
      image: require("../../assets/images/mahabalipuram.jpg"),
      location: "Tamil Nadu",
      rating: 4.5,
      categories: ["Historic", "Beach"],
      description:
        "Mahabalipuram is famous for its ancient rock-cut temples.\n\n" +
        "A UNESCO World Heritage site.\n\n" +
        "Beautiful coastal views.\n\n" +
        "Rich in Pallava architecture.\n\n" +
        "Great weekend getaway.",
      discussions: [],
    },
    {
      id: "pondicherry",
      title: "Pondicherry",
      image: require("../../assets/images/pondicherry.jpg"),
      location: "Puducherry",
      rating: 4.4,
      categories: ["Beach", "City", "Relax"],
      description:
        "Pondicherry has a strong French influence.\n\n" +
        "Calm beaches and cafes.\n\n" +
        "Popular for peace and spirituality.\n\n" +
        "Clean streets and architecture.\n\n" +
        "Ideal for slow travel.",
      discussions: [],
    },
    {
      id: "goa",
      title: "Goa Beach",
      image: require("../../assets/images/goa.jpg"),
      location: "Goa",
      rating: 4.7,
      categories: ["Beach", "Party"],
      description:
        "Goa is famous for its vibrant beaches.\n\n" +
        "Nightlife and water sports.\n\n" +
        "Mix of relaxation and adventure.\n\n" +
        "Great food culture.\n\n" +
        "Best during winter season.",
      discussions: [],
    },
    {
      id: "bali",
      title: "Bali",
      image: require("../../assets/images/bali.jpg"),
      location: "Indonesia",
      rating: 4.8,
      categories: ["Island", "Nature"],
      description:
        "Bali is a tropical paradise.\n\n" +
        "Known for temples and beaches.\n\n" +
        "Strong cultural heritage.\n\n" +
        "Great for honeymooners.\n\n" +
        "Popular worldwide.",
      discussions: [],
    },
    {
      id: "phuket",
      title: "Phuket",
      image: require("../../assets/images/phuket.jpg"),
      location: "Thailand",
      rating: 4.6,
      categories: ["Island", "Beach"],
      description:
        "Phuket offers clear waters and nightlife.\n\n" +
        "Famous for island hopping.\n\n" +
        "Great resorts.\n\n" +
        "Water sports hub.\n\n" +
        "Tourist favorite.",
      discussions: [],
    },
  ],

  /* ---------------- WATERFALLS ---------------- */
  "Famous Waterfalls": [
    {
      id: "courtallam",
      title: "Courtallam Falls",
      image: require("../../assets/images/courtallam.jpg"),
      location: "Tenkasi, Tamil Nadu",
      rating: 4.7,
      categories: ["Waterfall", "Nature"],
      description:
        "Known as the Spa of South India.\n\n" +
        "Water has herbal properties.\n\n" +
        "Surrounded by Western Ghats.\n\n" +
        "Very refreshing.\n\n" +
        "Best during monsoon.",
      discussions: [],
    },
    {
      id: "hogenakkal",
      title: "Hogenakkal Falls",
      image: require("../../assets/images/hogenakkal.jpg"),
      location: "Dharmapuri, Tamil Nadu",
      rating: 4.5,
      categories: ["Waterfall", "Adventure"],
      description:
        "Often called Niagara of India.\n\n" +
        "Located on Kaveri river.\n\n" +
        "Coracle rides available.\n\n" +
        "Misty views.\n\n" +
        "Post-monsoon best.",
      discussions: [],
    },
    {
      id: "jog",
      title: "Jog Falls",
      image: require("../../assets/images/jogfalls.jpg"),
      location: "Karnataka",
      rating: 4.6,
      categories: ["Waterfall", "Nature"],
      description:
        "One of the highest waterfalls in India.\n\n" +
        "Spectacular during monsoon.\n\n" +
        "Four segmented falls.\n\n" +
        "Great viewpoints.\n\n" +
        "Seasonal beauty.",
      discussions: [],
    },
    {
      id: "athirappilly",
      title: "Athirappilly Falls",
      image: require("../../assets/images/athirappilly.jpg"),
      location: "Kerala",
      rating: 4.7,
      categories: ["Waterfall", "Forest"],
      description:
        "Largest waterfall in Kerala.\n\n" +
        "Located in lush forest.\n\n" +
        "Popular filming location.\n\n" +
        "Powerful flow.\n\n" +
        "Best after rains.",
      discussions: [],
    },
    {
      id: "niagara",
      title: "Niagara Falls",
      image: require("../../assets/images/niagara.jpg"),
      location: "USA / Canada",
      rating: 4.9,
      categories: ["Waterfall", "Wonder"],
      description:
        "World-famous waterfalls.\n\n" +
        "Extremely powerful.\n\n" +
        "Boat tours available.\n\n" +
        "Iconic destination.\n\n" +
        "Year-round attraction.",
      discussions: [],
    },
    {
      id: "victoria",
      title: "Victoria Falls",
      image: require("../../assets/images/victoria.jpg"),
      location: "Zambia / Zimbabwe",
      rating: 4.8,
      categories: ["Waterfall", "Wonder"],
      description:
        "One of the Seven Natural Wonders.\n\n" +
        "Massive curtain of water.\n\n" +
        "Called ‘Smoke that Thunders’.\n\n" +
        "Breathtaking views.\n\n" +
        "Best after rains.",
      discussions: [],
    },
  ],

  /* ---------------- BEACHES ---------------- */
  Beaches: [
    {
      id: "rameswaram",
      title: "Rameswaram Beach",
      image: require("../../assets/images/rameswaram.jpg"),
      location: "Tamil Nadu",
      rating: 4.4,
      categories: ["Beach", "Spiritual"],
      description:
        "Calm and clean beach.\n\n" +
        "Near Ramanathaswamy Temple.\n\n" +
        "Peaceful atmosphere.\n\n" +
        "Ideal for families.\n\n" +
        "Best October–March.",
      discussions: [],
    },
    {
      id: "kanyakumari",
      title: "Kanyakumari Beach",
      image: require("../../assets/images/kanyakumari.jpg"),
      location: "Tamil Nadu",
      rating: 4.5,
      categories: ["Beach", "Sunrise"],
      description:
        "Famous for sunrise and sunset.\n\n" +
        "Three seas meet here.\n\n" +
        "Spiritual significance.\n\n" +
        "Popular tourist spot.\n\n" +
        "Crowded but beautiful.",
      discussions: [],
    },
    {
      id: "varkala",
      title: "Varkala Beach",
      image: require("../../assets/images/varkala.jpg"),
      location: "Kerala",
      rating: 4.6,
      categories: ["Beach", "Cliff"],
      description:
        "Unique cliff beach.\n\n" +
        "Peaceful and scenic.\n\n" +
        "Yoga and cafes.\n\n" +
        "Sunset views.\n\n" +
        "Relaxing vibe.",
      discussions: [],
    },
    {
      id: "baga",
      title: "Baga Beach",
      image: require("../../assets/images/baga.jpg"),
      location: "Goa",
      rating: 4.7,
      categories: ["Beach", "Party"],
      description:
        "Famous nightlife.\n\n" +
        "Water sports hub.\n\n" +
        "Crowded but fun.\n\n" +
        "Music and food.\n\n" +
        "Youth favorite.",
      discussions: [],
    },
    {
      id: "bondi",
      title: "Bondi Beach",
      image: require("../../assets/images/bondi.jpg"),
      location: "Australia",
      rating: 4.6,
      categories: ["Beach", "Surfing"],
      description:
        "Iconic Australian beach.\n\n" +
        "Surfing hotspot.\n\n" +
        "Clean and vibrant.\n\n" +
        "Popular worldwide.\n\n" +
        "Urban beach vibe.",
      discussions: [],
    },
    {
      id: "copacabana",
      title: "Copacabana",
      image: require("../../assets/images/copacabana.jpg"),
      location: "Brazil",
      rating: 4.5,
      categories: ["Beach", "City"],
      description:
        "Famous city beach.\n\n" +
        "Long shoreline.\n\n" +
        "Festive atmosphere.\n\n" +
        "Music and culture.\n\n" +
        "Tourist hotspot.",
      discussions: [],
    },
  ],

  "Cold Places": [
  {
    id: "ooty",
    title: "Ooty",
    image: require("../../assets/images/ooty.jpg"),
    location: "Tamil Nadu",
    rating: 4.6,
    categories: ["Hill Station", "Cold", "Nature"],
    description:
      "Ooty is a popular hill station in the Nilgiri Hills.\n\n" +
      "Known for its cool climate throughout the year.\n\n" +
      "Tea gardens and scenic viewpoints.\n\n" +
      "Ideal for family trips.\n\n" +
      "Best visited from October to June.",
    discussions: [],
  },
  {
    id: "kodaikanal",
    title: "Kodaikanal",
    image: require("../../assets/images/kodaikanal.jpg"),
    location: "Tamil Nadu",
    rating: 4.7,
    categories: ["Hill Station", "Cold", "Romantic"],
    description:
      "Kodaikanal is known as the Princess of Hill Stations.\n\n" +
      "Famous for misty valleys and lakes.\n\n" +
      "Very peaceful environment.\n\n" +
      "Popular honeymoon destination.\n\n" +
      "Best during winter and summer.",
    discussions: [],
  },
  {
    id: "manali",
    title: "Manali",
    image: require("../../assets/images/manali.jpg"),
    location: "Himachal Pradesh",
    rating: 4.8,
    categories: ["Snow", "Adventure", "Cold"],
    description:
      "Manali is famous for snow activities.\n\n" +
      "Adventure sports like skiing and paragliding.\n\n" +
      "Surrounded by Himalayas.\n\n" +
      "Great winter destination.\n\n" +
      "Very popular among youngsters.",
    discussions: [],
  },
  {
    id: "gulmarg",
    title: "Gulmarg",
    image: require("../../assets/images/gulmarg.jpg"),
    location: "Kashmir",
    rating: 4.9,
    categories: ["Snow", "Skiing", "Cold"],
    description:
      "Gulmarg is a premium ski destination.\n\n" +
      "Heavy snowfall in winter.\n\n" +
      "Cable car rides are famous.\n\n" +
      "Breathtaking landscapes.\n\n" +
      "Best winter travel spot.",
    discussions: [],
  },
  {
    id: "swiss",
    title: "Swiss Alps",
    image: require("../../assets/images/swiss.jpg"),
    location: "Switzerland",
    rating: 5.0,
    categories: ["Snow", "Mountains", "Luxury"],
    description:
      "Swiss Alps are world-famous mountains.\n\n" +
      "Snow-covered peaks.\n\n" +
      "Luxury travel destination.\n\n" +
      "Scenic train routes.\n\n" +
      "Expensive but stunning.",
    discussions: [],
  },
  {
    id: "reykjavik",
    title: "Reykjavik",
    image: require("../../assets/images/reykjavik.jpg"),
    location: "Iceland",
    rating: 4.7,
    categories: ["Cold", "City", "Northern Lights"],
    description:
      "Reykjavik is the capital of Iceland.\n\n" +
      "Known for Northern Lights.\n\n" +
      "Cold but beautiful city.\n\n" +
      "Unique landscapes.\n\n" +
      "Best in winter.",
    discussions: [],
  },
],


"Desert Destinations": [
  {
    id: "rameswaram-dunes",
    title: "Rameswaram Dunes",
    image: require("../../assets/images/rameswaramdunes.jpg"),
    location: "Tamil Nadu",
    rating: 4.2,
    categories: ["Desert", "Sand", "Nature"],
    description:
      "Sand dunes near Rameswaram coast.\n\n" +
      "Unique landscape.\n\n" +
      "Less crowded.\n\n" +
      "Photography friendly.\n\n" +
      "Short visit spot.",
    discussions: [],
  },
  {
    id: "dhanushkodi",
    title: "Dhanushkodi Sands",
    image: require("../../assets/images/dhanushkodi.jpg"),
    location: "Tamil Nadu",
    rating: 4.4,
    categories: ["Desert", "Ghost Town"],
    description:
      "Abandoned town near Rameswaram.\n\n" +
      "Surrounded by sand and sea.\n\n" +
      "Very windy.\n\n" +
      "Historical significance.\n\n" +
      "Eerie but beautiful.",
    discussions: [],
  },
  {
    id: "thar",
    title: "Thar Desert",
    image: require("../../assets/images/thar.jpg"),
    location: "Rajasthan",
    rating: 4.6,
    categories: ["Desert", "Camel Safari"],
    description:
      "Largest desert in India.\n\n" +
      "Camel rides and safaris.\n\n" +
      "Cultural experience.\n\n" +
      "Desert camps.\n\n" +
      "Best in winter.",
    discussions: [],
  },
  {
    id: "jaisalmer",
    title: "Jaisalmer Safari",
    image: require("../../assets/images/jaisalmer.jpg"),
    location: "Rajasthan",
    rating: 4.7,
    categories: ["Desert", "Adventure"],
    description:
      "Golden city of Rajasthan.\n\n" +
      "Famous desert safaris.\n\n" +
      "Folk music and dance.\n\n" +
      "Camping under stars.\n\n" +
      "Popular tourist attraction.",
    discussions: [],
  },
  {
    id: "sahara",
    title: "Sahara Desert",
    image: require("../../assets/images/sahara.jpg"),
    location: "Africa",
    rating: 4.8,
    categories: ["Desert", "Wonder"],
    description:
      "Largest hot desert in the world.\n\n" +
      "Extreme temperatures.\n\n" +
      "Vast sand dunes.\n\n" +
      "Iconic destination.\n\n" +
      "Harsh but fascinating.",
    discussions: [],
  },
  {
    id: "dubai-desert",
    title: "Dubai Desert",
    image: require("../../assets/images/dubai_desert.jpg"),
    location: "UAE",
    rating: 4.6,
    categories: ["Desert", "Safari"],
    description:
      "Luxury desert safaris.\n\n" +
      "Dune bashing.\n\n" +
      "Camel rides.\n\n" +
      "Cultural shows.\n\n" +
      "Very tourist-friendly.",
    discussions: [],
  },
],

"Amusement Parks": [
  {
    id: "queensland",
    title: "Queens Land",
    image: require("../../assets/images/queensland.jpg"),
    location: "Chennai",
    rating: 4.3,
    categories: ["Amusement", "Water Park"],
    description:
      "Popular water theme park.\n\n" +
      "Family-friendly rides.\n\n" +
      "Good for summer.\n\n" +
      "Kids enjoy a lot.\n\n" +
      "Weekend crowd.",
    discussions: [],
  },
  {
    id: "blackthunder",
    title: "Black Thunder",
    image: require("../../assets/images/blackthunder.jpg"),
    location: "Coimbatore",
    rating: 4.4,
    categories: ["Amusement", "Water Park"],
    description:
      "Large water theme park.\n\n" +
      "Many rides.\n\n" +
      "Good maintenance.\n\n" +
      "Family destination.\n\n" +
      "Hot weather favorite.",
    discussions: [],
  },
  {
    id: "wonderla",
    title: "Wonderla",
    image: require("../../assets/images/wonderla.jpg"),
    location: "Bangalore",
    rating: 4.7,
    categories: ["Amusement", "Thrill"],
    description:
      "Top amusement park in India.\n\n" +
      "High thrill rides.\n\n" +
      "Very popular.\n\n" +
      "Well managed.\n\n" +
      "All age groups.",
    discussions: [],
  },
  {
    id: "imagicaa",
    title: "Imagicaa",
    image: require("../../assets/images/imagicaa.jpg"),
    location: "Mumbai",
    rating: 4.6,
    categories: ["Theme Park", "Amusement"],
    description:
      "India’s largest theme park.\n\n" +
      "International-level rides.\n\n" +
      "Family & kids friendly.\n\n" +
      "Very clean.\n\n" +
      "Full-day experience.",
    discussions: [],
  },
  {
    id: "disneyland",
    title: "Disneyland",
    image: require("../../assets/images/disneyland.jpg"),
    location: "USA",
    rating: 5.0,
    categories: ["Theme Park", "Wonder"],
    description:
      "World-famous theme park.\n\n" +
      "Disney characters.\n\n" +
      "Magical experience.\n\n" +
      "Kids dream destination.\n\n" +
      "Expensive but iconic.",
    discussions: [],
  },
  {
    id: "universal",
    title: "Universal Studios",
    image: require("../../assets/images/universal.jpg"),
    location: "USA",
    rating: 4.9,
    categories: ["Theme Park", "Movies"],
    description:
      "Movie-based theme park.\n\n" +
      "Thrilling rides.\n\n" +
      "Harry Potter world.\n\n" +
      "Immersive experience.\n\n" +
      "Very popular globally.",
    discussions: [],
  },
],
};
