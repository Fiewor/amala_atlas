// Example usage in app/page.tsx or wherever

import RestaurantDetails from "@/components/local/RestaurantDetails";

export default function Details() {
  return (
    <RestaurantDetails
      name="Iya Basira's Kitchen"
      subtitle="Authentic Amala and Ewedu Soup"
      address="123 Opebi Road, Ikeja, Lagos"
      phone="+234 803 123 4567"
      hours="Mon-Sun: 10AM-10PM"
      priceRange="₦₦"
      authenticityScore={95}
      authenticityDescription="Verified by 15+ cultural experts. This badge indicates that the restaurant's food has been vetted and approved by a panel of Nigerian food connoisseurs."
      mainImage="/amala.jpg"
      sideImages={["/amala.jpg", "/amala.jpg", "/amala.jpg"]}
      reviews={[
        {
          userName: "Chidinma Eze",
          userImage: "/user.jpg",
          timeAgo: "2 weeks ago",
          rating: 5,
          text: "The Amala here is simply divine! It tastes just like my grandmother's recipe. The meats are well-seasoned and the Ewedu soup is perfectly slimy. Highly recommend!",
          likes: 12,
          comments: 2,
        },
        {
          userName: "Adekunle Adebayo",
          userImage: "/user.jpg",
          timeAgo: "1 month ago",
          rating: 4,
          text: "Iya Basira's is a solid choice for Amala lovers. The portions are generous and the prices are reasonable. The only downside is that it can get quite crowded during peak hours.",
          likes: 8,
          comments: 1,
        },
        {
          userName: "Ngozi Okoro",
          userImage: "/user.jpg",
          timeAgo: "2 months ago",
          rating: 5,
          text: "This place is a gem! The Amala is authentic and the service is top-notch. I especially love the variety of meats they offer. Definitely a must-try for anyone visiting Lagos.",
          likes: 15,
          comments: 0,
        },
      ]}
    />
  );
}