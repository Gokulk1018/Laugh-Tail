export type LocalPlace = {
  id: string;
  title: string;
  category: string;
  type: string;
  city: string;
};

export function getLocalPlaces(): LocalPlace[] {
  return [
    {
      id: "1",
      title: "Goa Beach",
      category: "Beach",
      type: "Family",
      city: "Goa",
    },
    {
      id: "2",
      title: "Manali Hills",
      category: "Mountain",
      type: "Friends",
      city: "Manali",
    },
    {
      id: "3",
      title: "Wayanad Forest",
      category: "Forest",
      type: "Solo",
      city: "Wayanad",
    },
    {
      id: "4",
      title: "Thar Desert Safari",
      category: "Desert",
      type: "Group Tour",
      city: "Jaisalmer",
    },
    {
      id: "5",
      title: "Bali Island",
      category: "Island",
      type: "Couple",
      city: "Bali",
    },
    {
      id: "6",
      title: "Rishikesh Adventure",
      category: "Adventure",
      type: "Backpacking",
      city: "Rishikesh",
    },
    {
      id: "7",
      title: "Paris City Tour",
      category: "City",
      type: "Luxury",
      city: "Paris",
    },
  ];
}